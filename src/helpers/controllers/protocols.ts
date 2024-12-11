import { Lists, User } from "@prisma/client";
import { HttpReponse, HttpRequest } from "../protocols";
import { CreateUserParams } from "../../types/user";
import { CreateListParams } from "../../types/list";

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
