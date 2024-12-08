import { User } from "@prisma/client";
import { HttpReponse, HttpRequest } from "../protocols";

export interface ICreateUserController {
  execute(httpRequest: HttpRequest<User>): Promise<HttpReponse<User>>;
}
