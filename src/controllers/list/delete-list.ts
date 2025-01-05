import { Lists } from "@prisma/client";
import { IDeleteListController } from "../../interfaces/controllers/protocols";
import { HttpReponse } from "../../interfaces/protocols";
import { IDeleteListUseCase } from "../../interfaces/use-case/protocols";

export class DeleteListController implements IDeleteListController {
  constructor(private readonly deleteListUseCase: IDeleteListUseCase) {}
  async execute(listId: string): Promise<HttpReponse<Lists>> {
    try {
      if (!listId) {
        return {
          statusCode: 400,
          body: "Missing parameters",
        };
      }

      const listDeleted = await this.deleteListUseCase.execute(listId);

      if (!listDeleted) {
        return {
          statusCode: 400,
          body: "List not found",
        };
      }

      return {
        statusCode: 200,
        body: listDeleted,
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: error,
      };
    }
  }
}
