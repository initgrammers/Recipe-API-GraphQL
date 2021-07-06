import { MiddlewareFn, MiddlewareInterface, NextFn, ResolverData } from "type-graphql";
import { verify } from "jsonwebtoken";
import { authContext } from './auth_context';
import { config as dotenv } from "dotenv"
import { Container, Service } from 'typedi';
import { UserService } from "../services";

dotenv();

const secretToken = process.env.SECRET_KEY || '';

@Service()
export class isAuth implements MiddlewareInterface<authContext> {
  async use({ context }: ResolverData<authContext>, next: NextFn) {
    const authorization = context.req.headers["authorization"];
  if (!authorization) {
    throw new Error("Not authenticated");
  }

  try {
    const token = authorization.split(" ")[1];
    const payload = verify(token, secretToken) as {
        userId: string;
    };

    if (!payload.userId) {
        throw new Error('Authorization token not valid.');
    }

    const userService = Container.get(UserService);
    const user = await userService.getOneById(Number(payload.userId));
    if (!user) {
        throw new Error('Authorization token not valid.');
    }
    context.authUser = user;
  } catch (err) {
    throw new Error(`Not authenticated ${err.message}`);
  }
    return next();
  }
}