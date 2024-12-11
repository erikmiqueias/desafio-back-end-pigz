import { ListShares } from "@prisma/client";
import { IShareListUseCase } from "../../helpers/use-case/protocols";
import { IPostgresShareListRepository } from "../../helpers/repositories/protocols";

export class ShareListUseCase implements IShareListUseCase {
  constructor(
    private readonly postgresShareListRepository: IPostgresShareListRepository,
  ) {}
  async execute(
    listId: string,
    userId: string,
    can_edit: boolean,
  ): Promise<ListShares> {
    if (!listId || !userId) {
      throw new Error("An unknown error occurred");
    }

    const shareList = await this.postgresShareListRepository.execute(
      listId,
      userId,
      can_edit,
    );

    return shareList;
  }
}
