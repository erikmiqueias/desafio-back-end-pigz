import { Lists, Tasks, User } from "@prisma/client";
import { CreateUserParams } from "../../types/user";
import { CreateListParams } from "../../types/list";
import { CreateTaskParams } from "../../types/tasks";

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

export interface IPostgresDeleteListRepository {
  execute(listId: string): Promise<Lists>;
}
