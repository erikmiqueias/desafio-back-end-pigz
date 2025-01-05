import { Tasks } from "@prisma/client";
import { IPostgresCompleteTaskRepository } from "../../interfaces/repositories/protocols";
import { prisma } from "../../../prisma/prisma";

export class PostgresCompleteTaskRepository
  implements IPostgresCompleteTaskRepository
{
  async execute(taskId: string, is_completed: boolean): Promise<Tasks> {
    const task = await prisma.tasks.update({
      where: {
        id: taskId,
      },
      data: {
        is_completed: is_completed,
      },
    });

    return task;
  }
}
