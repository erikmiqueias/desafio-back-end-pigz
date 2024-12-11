import { Tasks } from "@prisma/client";
import { ICreateTaskUseCase } from "../../helpers/use-case/protocols";
import { CreateTaskParams } from "../../types/tasks";
import { IPostgresCreateTaskRepository } from "../../helpers/repositories/protocols";

export class CreateTaskUseCase implements ICreateTaskUseCase {
  constructor(
    private readonly postgresCreateTaskRepository: IPostgresCreateTaskRepository,
  ) {}
  async execute(
    listId: string,
    createTaskParams: CreateTaskParams,
  ): Promise<Tasks> {
    const task = createTaskParams;

    if (!task) {
      throw new Error("An unknown error occurred");
    }

    const taskCreated = await this.postgresCreateTaskRepository.execute(
      listId,
      {
        ...task,
      },
    );

    return taskCreated;
  }
}
