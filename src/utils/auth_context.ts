import { Request, Response } from "express";
import { User } from "../entities";

export interface authContext {
  req: Request;
  res: Response;
  authUser?: User;
}