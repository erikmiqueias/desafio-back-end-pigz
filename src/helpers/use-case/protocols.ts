import { Lists, User } from "@prisma/client";
import { CreateUserParams } from "../../types/user";
import { CreateListParams } from "../../types/list";

export interface ICreateUserUseCase {
  execute(createUserParams: CreateUserParams): Promise<User>;
}

export interface ICreateListUseCase {
  execute(userId: string, createListParams: CreateListParams): Promise<Lists>;
}
