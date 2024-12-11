import { Lists } from "@prisma/client";
import { IShareListController } from "../../helpers/controllers/protocols";
import { HttpReponse } from "../../helpers/protocols";
import { IShareListUseCase } from "../../helpers/use-case/protocols";

export class ShareListController implements IShareListController {
  constructor(private readonly shareListUseCase: IShareListUseCase) {}
  async execute(listId: string, userId: string): Promise<HttpReponse<Lists>> {
    try {
      if (!listId || !userId) {
        return {
          statusCode: 400,
          body: "Missing parameters",
        };
      }

      const listShared = await this.shareListUseCase.execute(listId, userId);

      if (!listShared) {
        return {
          statusCode: 400,
          body: "List not found",
        };
      }

      return {
        statusCode: 200,
        body: listShared,
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: error,
      };
    }
  }
}
