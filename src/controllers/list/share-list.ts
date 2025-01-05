import { ListShares } from "@prisma/client";
import { IShareListController } from "../../interfaces/controllers/protocols";
import { HttpReponse } from "../../interfaces/protocols";
import { IShareListUseCase } from "../../interfaces/use-case/protocols";

export class ShareListController implements IShareListController {
  constructor(private readonly shareListUseCase: IShareListUseCase) {}
  async execute(
    listId: string,
    userId: string,
    can_edit: boolean,
  ): Promise<HttpReponse<ListShares>> {
    try {
      if (!listId || !userId) {
        return {
          statusCode: 400,
          body: "Missing parameters",
        };
      }

      const listShared = await this.shareListUseCase.execute(
        listId,
        userId,
        can_edit,
      );

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
