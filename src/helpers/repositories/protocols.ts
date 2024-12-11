import { Lists, Tasks, User } from "@prisma/client";
import { CreateUserParams } from "../../types/user";
import { CreateListParams } from "../../types/list";
import { CreateTaskParams } from "../../types/tasks";
import { ShareListResponse } from "../../types/share-list";

export interface IPostgresCreateUserRepository {
  execute(params: CreateUserParams): Promise<User>;
}

export interface IPostgresCreateListRepository {
  execute(id: string, params: CreateListParams): Promise<Lists>;
}

export interface IPostgresCreateTaskRepository {
  execute(listId: string, params: CreateTaskParams): Promise<Tasks>;
}

export interface IPostgresCompleteTaskRepository {
  execute(taskId: string, is_completed: boolean): Promise<Tasks>;
}

export interface IPostgresDeleteTaskRepository {
  execute(taskId: string): Promise<Tasks>;
}

export interface IPostgresDeleteListRepository {
  execute(listId: string): Promise<Lists>;
}

export interface IPostgresShareListRepository {
  execute(
    listId: string,
    userId: string,
    can_edit: boolean,
  ): Promise<ShareListResponse>;
}
