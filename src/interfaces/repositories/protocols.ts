import { User } from "@prisma/client";
import { CreateUserParams } from "../../types/user";

export interface IPostgresCreateUserRepository {
  execute(params: CreateUserParams): Promise<User>;
}
