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

      const fields = ["list_name", "owner_id"];

      if (!listData) {
        return {
          statusCode: 400,
          body: "Missing parameters",
        };
      }

      const missingFields = Object.keys(listData).some((key) =>
        fields.includes(key),
      );

      if (!missingFields) {
        return {
          statusCode: 400,
          body: `Missing fields: ${fields.join(", ")}`,
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
