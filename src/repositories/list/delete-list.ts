import { Lists } from "@prisma/client";
import { IPostgresDeleteListRepository } from "../../interfaces/repositories/protocols";
import { prisma } from "../../../prisma/prisma";

export class PostgresDeleteListRepository
  implements IPostgresDeleteListRepository
{
  async execute(listId: string): Promise<Lists> {
    const list = await prisma.lists.delete({
      where: {
        id: listId,
      },
    });

    return list;
  }
}
