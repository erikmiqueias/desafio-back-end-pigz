import { Lists, Tasks, User } from "@prisma/client";
import { CreateUserParams } from "../../types/user";
import { CreateListParams } from "../../types/list";
import { CreateTaskParams } from "../../types/tasks";

export interface ICreateUserUseCase {
  execute(createUserParams: CreateUserParams): Promise<User>;
}

export interface ICreateListUseCase {
  execute(userId: string, createListParams: CreateListParams): Promise<Lists>;
}

export interface ICreateTaskUseCase {
  execute(listId: string, createTaskParams: CreateTaskParams): Promise<Tasks>;
}
