import { Lists, ListShares, Tasks, User } from "@prisma/client";
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

export interface ICompleteTaskUseCase {
  execute(taskId: string, is_completed: boolean): Promise<Tasks>;
}

export interface IDeleteTaskUseCase {
  execute(taskId: string): Promise<Tasks>;
}

export interface IDeleteListUseCase {
  execute(listId: string): Promise<Lists>;
}

export interface IShareListUseCase {
  execute(
    listId: string,
    userId: string,
    can_edit: boolean,
  ): Promise<ListShares>;
}

export interface IGetUserByEmailUseCase {
  execute(email: string): Promise<User>;
}
