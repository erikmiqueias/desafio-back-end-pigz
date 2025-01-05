import { Tasks } from "@prisma/client";
import { IDeleteTaskUseCase } from "../../interfaces/use-case/protocols";
import { IPostgresDeleteTaskRepository } from "../../interfaces/repositories/protocols";

export class DeleteTaskUseCase implements IDeleteTaskUseCase {
  constructor(
    private readonly postgresDeleteTaskRepository: IPostgresDeleteTaskRepository,
  ) {}
  async execute(taskId: string): Promise<Tasks> {
    if (!taskId) {
      throw new Error("An unknown error occurred");
    }

    const task = this.postgresDeleteTaskRepository.execute(taskId);

    return task;
  }
}
