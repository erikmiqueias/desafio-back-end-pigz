import { IPostgresShareListRepository } from "../../interfaces/repositories/protocols";
import { prisma } from "../../../prisma/prisma";
import { ShareListResponse } from "../../types/share-list";

export class PostgresShareListRepository
  implements IPostgresShareListRepository
{
  async execute(
    listId: string,
    userId: string,
    can_edit: boolean,
  ): Promise<ShareListResponse> {
    const shareList = await prisma.lists.update({
      where: {
        id: listId,
      },
      data: {
        ListShares: {
          create: {
            user_id: userId,
            can_edit: can_edit,
          },
        },
      },
    });

    return {
      ...shareList,
      list_id: shareList.id,
      user_id: userId,
      can_edit: can_edit,
    };
  }
}
