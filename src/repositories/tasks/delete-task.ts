import { Tasks } from "@prisma/client";
import { IPostgresDeleteTaskRepository } from "../../interfaces/repositories/protocols";
import { prisma } from "../../../prisma/prisma";

export class PostgresDeleteTaskRepository
  implements IPostgresDeleteTaskRepository
{
  async execute(taskId: string): Promise<Tasks> {
    const task = await prisma.tasks.delete({
      where: {
        id: taskId,
      },
    });

    return task;
  }
}
