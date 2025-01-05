import { Tasks } from "@prisma/client";
import { IDeleteTaskController } from "../../interfaces/controllers/protocols";
import { HttpReponse } from "../../interfaces/protocols";
import { IDeleteTaskUseCase } from "../../interfaces/use-case/protocols";

export class DeleteTaskController implements IDeleteTaskController {
  constructor(private readonly deleteTaskUseCase: IDeleteTaskUseCase) {}
  async execute(taskId: string): Promise<HttpReponse<Tasks>> {
    try {
      if (!taskId) {
        return {
          statusCode: 400,
          body: "Missing parameters",
        };
      }

      const taskDeleted = await this.deleteTaskUseCase.execute(taskId);

      if (!taskDeleted) {
        return {
          statusCode: 400,
          body: "Task not found",
        };
      }

      return {
        statusCode: 200,
        body: taskDeleted,
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: error,
      };
    }
  }
}
