import { Tasks } from "@prisma/client";
import { ICompleteTaskUseCase } from "../../interfaces/use-case/protocols";
import { PostgresCompleteTaskRepository } from "../../repositories/tasks/complete-task";

export class CompleteTaskUseCase implements ICompleteTaskUseCase {
  constructor(
    private readonly postgresCompleteTaskRepository: PostgresCompleteTaskRepository,
  ) {}

  async execute(taskId: string, is_completed: boolean): Promise<Tasks> {
    if (!taskId) {
      throw new Error("An unknown error occurred");
    }

    if (is_completed === undefined) {
      throw new Error("An unknown error occurred");
    }

    const taskCompleted = this.postgresCompleteTaskRepository.execute(
      taskId,
      is_completed,
    );

    return taskCompleted;
  }
}
