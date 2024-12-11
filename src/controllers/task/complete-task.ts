import { Tasks } from "@prisma/client";
import { ICompleteTaskController } from "../../helpers/controllers/protocols";
import { HttpReponse } from "../../helpers/protocols";
import { ICompleteTaskUseCase } from "../../helpers/use-case/protocols";

export class CompleteTaskController implements ICompleteTaskController {
  constructor(private readonly completeTaskUseCase: ICompleteTaskUseCase) {}
  async execute(
    taskId: string,
    is_completed: boolean,
  ): Promise<HttpReponse<Tasks>> {
    try {
      const allowedOptions = [true, false];

      if (!taskId || is_completed === undefined) {
        return {
          statusCode: 400,
          body: "Missing parameters",
        };
      }

      const isOptionValid = allowedOptions.some(
        (option) => option === is_completed,
      );

      if (!isOptionValid) {
        return {
          statusCode: 400,
          body: "Invalid option",
        };
      }

      const taskCompleted = await this.completeTaskUseCase.execute(
        taskId,
        is_completed,
      );

      return {
        statusCode: 200,
        body: taskCompleted,
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: error,
      };
    }
  }
}
