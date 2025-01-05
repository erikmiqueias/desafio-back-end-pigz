import { Tasks } from "@prisma/client";
import { ICreateTaskController } from "../../interfaces/controllers/protocols";
import { HttpRequest, HttpReponse } from "../../interfaces/protocols";
import { CreateTaskParams } from "../../types/tasks";
import { ICreateTaskUseCase } from "../../interfaces/use-case/protocols";

export class CreateTaskController implements ICreateTaskController {
  constructor(private readonly createTaskUseCase: ICreateTaskUseCase) {}
  async execute(
    listId: string,
    httpRequest: HttpRequest<CreateTaskParams>,
  ): Promise<HttpReponse<Tasks>> {
    try {
      const task = httpRequest.body;

      const allowedFields = ["description", "is_completed", "list_id"];

      if (!task) {
        return {
          statusCode: 400,
          body: "Missing parameters",
        };
      }

      const missingFields = Object.keys(task).some((key) =>
        allowedFields.includes(key),
      );

      if (!missingFields) {
        return {
          statusCode: 400,
          body: `Missing fields: ${allowedFields.join(", ")}`,
        };
      }

      const taskCreated = await this.createTaskUseCase.execute(listId, task);

      return {
        statusCode: 201,
        body: taskCreated,
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: error,
      };
    }
  }
}
