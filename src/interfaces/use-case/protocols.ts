import { User } from "@prisma/client";
import { CreateUserParams } from "../../types/user";

export interface ICreateUserUseCase {
  execute(createUserParams: CreateUserParams): Promise<User>;
}
