import { Lists, ListShares, Tasks, User } from "@prisma/client";
import { HttpReponse, HttpRequest } from "../protocols";
import { CreateUserParams } from "../../types/user";
import { CreateListParams } from "../../types/list";
import { CreateTaskParams } from "../../types/tasks";

export interface ICreateUserController {
  execute(
    httpRequest: HttpRequest<CreateUserParams>,
  ): Promise<HttpReponse<User>>;
}

export interface ICreateListController {
  execute(
    userId: string,
    httpRequest: HttpRequest<CreateListParams>,
  ): Promise<HttpReponse<Lists>>;
}

export interface ICreateTaskController {
  execute(
    listId: string,
    httpRequest: HttpRequest<CreateTaskParams>,
  ): Promise<HttpReponse<Tasks>>;
}

export interface ICompleteTaskController {
  execute(taskId: string, is_completed: boolean): Promise<HttpReponse<Tasks>>;
}

export interface IDeleteTaskController {
  execute(taskId: string): Promise<HttpReponse<Tasks>>;
}

export interface IDeleteListController {
  execute(listId: string): Promise<HttpReponse<Lists>>;
}

export interface IShareListController {
  execute(
    listId: string,
    userId: string,
    can_edit: boolean,
  ): Promise<HttpReponse<ListShares>>;
}
