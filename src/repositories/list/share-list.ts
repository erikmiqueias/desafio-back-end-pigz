import { Lists } from "@prisma/client";
import { IPostgresShareListRepository } from "../../helpers/repositories/protocols";
import { prisma } from "../../../prisma/prisma";

export class PostgresShareListRepository
  implements IPostgresShareListRepository
{
  async execute(listId: string, userId: string): Promise<Lists> {
    const shareList = await prisma.lists.update({
      where: {
        id: listId,
      },
      data: {
        ListShares: {
          create: {
            user_id: userId,
          },
        },
      },
    });

    return shareList;
  }
}
