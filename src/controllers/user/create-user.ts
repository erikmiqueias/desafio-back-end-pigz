import { User } from "@prisma/client";
import { ICreateUserController } from "../../interfaces/controllers/protocols";
import { HttpRequest, HttpReponse } from "../../interfaces/protocols";
import { IPostgresCreateUserRepository } from "../../interfaces/repositories/protocols";

export class CreateUserController implements ICreateUserController {
  constructor(private createUserRepository: IPostgresCreateUserRepository) {}
  async execute(httpRequest: HttpRequest<User>): Promise<HttpReponse<User>> {
    try {
      const body = httpRequest.body;

      if (!body) {
        return {
          statusCode: 400,
          body: "Some required fields are missing",
        };
      }

      const user = await this.createUserRepository.execute(body);

      return {
        statusCode: 201,
        body: user,
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: {
          message: "Internal server error",
          errorCode: error,
        },
      };
    }
  }
}
