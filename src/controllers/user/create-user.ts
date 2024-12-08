import { User } from "@prisma/client";
import { ICreateUserController } from "../../interfaces/controllers/protocols";
import { HttpRequest, HttpReponse } from "../../interfaces/protocols";
import { ICreateUserUseCase } from "../../interfaces/use-case/protocols";
import validator from "validator";
import { CreateUserParams } from "../../types/user";

export class CreateUserController implements ICreateUserController {
  constructor(private readonly createUserUseCase: ICreateUserUseCase) {}
  async execute(
    httpRequest: HttpRequest<CreateUserParams>,
  ): Promise<HttpReponse<User>> {
    try {
      const user = httpRequest.body;
      if (!user) {
        return {
          statusCode: 400,
          body: "Missing parameters",
        };
      }

      const emailIsValid = validator.isEmail(user.email);

      if (!emailIsValid) {
        return {
          statusCode: 400,
          body: "Invalid email",
        };
      }

      const userCreated = await this.createUserUseCase.execute(user);

      return {
        statusCode: 201,
        body: userCreated,
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: error,
      };
    }
  }
}
