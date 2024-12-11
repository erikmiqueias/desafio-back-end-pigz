import { Lists, User } from "@prisma/client";
import { CreateUserParams } from "../../types/user";
import { CreateListParams } from "../../types/list";

export interface IPostgresCreateUserRepository {
  execute(params: CreateUserParams): Promise<User>;
}

export interface IPostgresCreateListRepository {
  execute(id: string, params: CreateListParams): Promise<Lists>;
}
