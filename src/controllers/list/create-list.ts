import { Lists } from "@prisma/client";
import { ICreateListController } from "../../helpers/controllers/protocols";
import { HttpRequest, HttpReponse } from "../../helpers/protocols";
import { CreateListParams } from "../../types/list";
import { ICreateListUseCase } from "../../helpers/use-case/protocols";

export class CreateListController implements ICreateListController {
  constructor(private readonly createListUseCase: ICreateListUseCase) {}
  async execute(
    userId: string,
    httpRequest: HttpRequest<CreateListParams>,
  ): Promise<HttpReponse<Lists>> {
    try {
      const listData = httpRequest.body;

      if (!listData) {
        return {
          statusCode: 400,
          body: "Missing parameters",
        };
      }

      if (!userId) {
        return {
          statusCode: 400,
          body: "Missing user id",
        };
      }

      const list = await this.createListUseCase.execute(userId, listData);

      return {
        statusCode: 201,
        body: list,
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: error,
      };
    }
  }
}
