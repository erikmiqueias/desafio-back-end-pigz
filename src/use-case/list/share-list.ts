import { Lists } from "@prisma/client";
import { IShareListUseCase } from "../../helpers/use-case/protocols";
import { IPostgresShareListRepository } from "../../helpers/repositories/protocols";

export class ShareListUseCase implements IShareListUseCase {
  constructor(
    private readonly postgresShareListRepository: IPostgresShareListRepository,
  ) {}
  async execute(listId: string, userId: string): Promise<Lists> {
    if (!listId || !userId) {
      throw new Error("An unknown error occurred");
    }

    const shareList = await this.postgresShareListRepository.execute(
      listId,
      userId,
    );

    return shareList;
  }
}
