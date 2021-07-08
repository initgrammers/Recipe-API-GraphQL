import { Service } from 'typedi';
import { User } from '../entities/User';
import { CreateUserInput, LoginUserInput, UpdateUserInput } from '../models/user';
import { hash, compare } from "bcryptjs";
import { LoginResponse } from '../utils/LoginResponse';
import { sign } from "jsonwebtoken";

import { config as dotenv } from "dotenv"

dotenv();

const secretToken = process.env.SECRET_KEY || '';
const expiresIn = process.env.EXPIRES_IN || '';

@Service()
export class UserService {

  getAll = async (): Promise<User[]> => {
    const allUsers = await User.find();
    return allUsers;
  };

  getOne = async(email: string): Promise<User | undefined> => {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw new Error(`The user with email: ${email} does not exist!`);
    }
    return user;
  };

  getOneById = async(id: number): Promise<User | undefined> => {
    const user = await User.findOne({ where: { id } });
    if (!user) {
      throw new Error(`The user with id: ${id} does not exist!`);
    }
    return user;
  };

  register = async (createUserInput: CreateUserInput): Promise<Boolean> => {
    const {password, name, email} = createUserInput;
    const hashedPassword = await hash(password, 13);
    try {
      const userHashed: CreateUserInput = {
        name, 
        email,
        password: hashedPassword
      }
      await User.create(userHashed).save();
      return true;
    } catch (error) {
      return false;
    }
  };

  signIn = async (loginUser: LoginUserInput): Promise<LoginResponse> => {
    const {email, password} = loginUser;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw new Error(`The user does not exist!`);
    }
    const verify = await compare(password, user.password);

    if (!verify) {
      throw new Error("Bad password");
    }

    return {
      accessToken: sign({ userId: user.id }, secretToken, {
        expiresIn: expiresIn
      })
    };
  };

  update = async (
    id: number,
    updateUserInput: UpdateUserInput,
  ): Promise<User> => {
    const userFound = await User.findOne({ where: { id } });
    if (!userFound) {
      throw new Error(`The user with id: ${id} does not exist!`);
    }
    const {password, name, email}=updateUserInput;
    const passwordHashed = await hash(password, 13);
    const userHashed: UpdateUserInput = {
      name,
      email,
      password: passwordHashed
    }
    Object.assign(userFound, userHashed);
    const updatedUser = await userFound.save();
    return updatedUser;
  };

  delete = async (id: number): Promise<boolean> => {
    const userFound = await User.findOne({ where: { id } });

    if (!userFound) {
      throw new Error(`The user with id: ${id} does not exist!`);
    }

    await userFound.remove();
    return true;
  };
}