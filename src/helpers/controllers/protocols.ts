import { User } from "@prisma/client";
import { HttpReponse, HttpRequest } from "../protocols";
import { CreateUserParams } from "../../types/user";

export interface ICreateUserController {
  execute(
    httpRequest: HttpRequest<CreateUserParams>,
  ): Promise<HttpReponse<User>>;
}
