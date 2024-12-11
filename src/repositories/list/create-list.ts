import { Lists } from "@prisma/client";
import { IPostgresCreateListRepository } from "../../helpers/repositories/protocols";
import { prisma } from "../../../prisma/prisma";
import { CreateListParams } from "../../types/list";

export class PostgresCreateListRepository
  implements IPostgresCreateListRepository
{
  async execute(id: string, params: CreateListParams): Promise<Lists> {
    const list = await prisma.lists.create({
      data: {
        list_name: params.list_name,
        owner_id: id,
      },
    });

    return list;
  }
}
