import { Lists } from "@prisma/client";
import { ICreateListUseCase } from "../../helpers/use-case/protocols";
import { CreateListParams } from "../../types/list";
import { IPostgresCreateListRepository } from "../../helpers/repositories/protocols";
import { v4 as uuidv4 } from "uuid";

export class CreateListUseCase implements ICreateListUseCase {
  constructor(
    private readonly postgresCreateListRepository: IPostgresCreateListRepository,
  ) {}
  async execute(
    userId: string,
    createListParams: CreateListParams,
  ): Promise<Lists> {
    const listData = createListParams;
    const listId = uuidv4();

    if (userId) {
      throw new Error("An unknown error occurred");
    }

    if (!listData) {
      throw new Error("An unknown error occurred");
    }

    const list = await this.postgresCreateListRepository.execute(userId, {
      ...listData,
      id: listId,
    });

    return list;
  }
}
