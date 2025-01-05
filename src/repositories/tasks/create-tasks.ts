import { Tasks } from "@prisma/client";
import { IPostgresCreateTaskRepository } from "../../interfaces/repositories/protocols";
import { CreateTaskParams } from "../../types/tasks";
import { prisma } from "../../../prisma/prisma";

export class PostgresCreateTaskRepository
  implements IPostgresCreateTaskRepository
{
  async execute(listId: string, params: CreateTaskParams): Promise<Tasks> {
    const task = await prisma.tasks.create({
      data: {
        description: params.description,
        is_completed: params.is_completed,
        list_id: listId,
      },
    });

    return task;
  }
}
