import { Query, Resolver, Mutation, Arg, Ctx, UseMiddleware } from 'type-graphql';
import { Service } from 'typedi';
import {  CreateUserInput, LoginUserInput, UpdateUserInput } from '../models';
import {  User } from '../entities'
import { UserService } from '../services';
import { LoginResponse } from '../utils/LoginResponse';

@Service()
@Resolver(()=> User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [User], { nullable: true })
  async getUsers(): Promise<User[]> {
    const getAll = await this.userService.getAll();
    return getAll;
  }

  @Query(() => User, { nullable: true })
  async getUser(@Arg('name') name: string): Promise<User | undefined> {

    const getOne = await this.userService.getOne(name);
    return getOne;
  }

  @Mutation(() => Boolean)
  async signUp(
    @Arg('UserInput') createUserInput: CreateUserInput,
  ): Promise<Boolean> {
      const registerUser = await this.userService.register(createUserInput);
      return registerUser;
  }

  @Mutation(() => LoginResponse)
  async login(
    @Arg('UserInput') loginUserInput: LoginUserInput,
  ): Promise<LoginResponse> {
      const loginUser = await this.userService.signIn(loginUserInput);
      return loginUser;
  }


  @Mutation(() => User)
  async updateUser(
    @Arg('id') id: number,
    @Arg('UserInput') updateUserInput: UpdateUserInput
  ): Promise<User> {
      const updateUser = await this.userService.update(id, updateUserInput);
      return updateUser
  }

  @Mutation(() => Boolean)
  async deleteUser(@Arg('id') id: number): Promise<boolean> {
    const deleteUser = await this.userService.delete(id);
    return deleteUser;
  }
}