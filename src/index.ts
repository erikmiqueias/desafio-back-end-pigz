import express from "express";
import { config } from "dotenv";
import { CreateUserController } from "./controllers/user/create-user";
import { CreateUserUseCase } from "./use-case/user/create-user";
import { PostgresCreateUserRepository } from "./repositories/user/create-user";
import { PostgresCreateListRepository } from "./repositories/list/create-list";
import { CreateListUseCase } from "./use-case/list/create-list";
import { CreateListController } from "./controllers/list/create-list";
import { PostgresCreateTaskRepository } from "./repositories/tasks/create-tasks";
import { CreateTaskUseCase } from "./use-case/tasks/create-task";
import { CreateTaskController } from "./controllers/task/create-task";
import { PostgresDeleteListRepository } from "./repositories/list/delete-list";
import { DeleteListUseCase } from "./use-case/list/delete-list";
import { DeleteListController } from "./controllers/list/delete-list";
import { PostgresCompleteTaskRepository } from "./repositories/tasks/complete-task";
import { CompleteTaskUseCase } from "./use-case/tasks/complete-task";
import { CompleteTaskController } from "./controllers/task/complete-task";
import { DeleteTaskController } from "./controllers/task/delete-task";
import { PostgresDeleteTaskRepository } from "./repositories/tasks/delete-task";
import { DeleteTaskUseCase } from "./use-case/tasks/delete-task";
import { ShareListController } from "./controllers/list/share-list";
import { PostgresShareListRepository } from "./repositories/list/share-list";
import { ShareListUseCase } from "./use-case/list/share-list";

config();
const app = express();
const PORT = process.env.PORT;

app.use(express.json());

app.post("/users", async (req, res) => {
  const createUserRepository = new PostgresCreateUserRepository();
  const createUserUseCase = new CreateUserUseCase(createUserRepository);
  const createUserController = new CreateUserController(createUserUseCase);

  const { statusCode, body } = await createUserController.execute(req);

  res.status(statusCode).send(body);
});

app.post("/lists/:id", async (req, res) => {
  const createListRepository = new PostgresCreateListRepository();
  const createListUseCase = new CreateListUseCase(createListRepository);
  const createListController = new CreateListController(createListUseCase);

  const { statusCode, body } = await createListController.execute(
    req.params.id,
    req,
  );

  res.status(statusCode).send(body);
});

app.delete("/lists/:id", async (req, res) => {
  const deleteListRepository = new PostgresDeleteListRepository();
  const deleteListUseCase = new DeleteListUseCase(deleteListRepository);
  const deleteListController = new DeleteListController(deleteListUseCase);

  const { statusCode, body } = await deleteListController.execute(
    req.params.id,
  );

  res.status(statusCode).send(body);
});

app.post("/lists/:id/tasks", async (req, res) => {
  const createTaskRepository = new PostgresCreateTaskRepository();
  const createTaskUseCase = new CreateTaskUseCase(createTaskRepository);
  const createTaskController = new CreateTaskController(createTaskUseCase);

  const { statusCode, body } = await createTaskController.execute(
    req.params.id,
    req,
  );

  res.status(statusCode).send(body);
});

app.patch("/tasks/:id", async (req, res) => {
  const completeTaskRepository = new PostgresCompleteTaskRepository();
  const completeTaskUseCase = new CompleteTaskUseCase(completeTaskRepository);
  const completeTaskController = new CompleteTaskController(
    completeTaskUseCase,
  );

  const { statusCode, body } = await completeTaskController.execute(
    req.params.id,
    req.body.is_completed,
  );

  res.status(statusCode).send(body);
});

app.delete("/tasks/:id", async (req, res) => {
  const deleteTaskRepository = new PostgresDeleteTaskRepository();
  const deleteTaskUseCase = new DeleteTaskUseCase(deleteTaskRepository);
  const deleteTaskController = new DeleteTaskController(deleteTaskUseCase);

  const { statusCode, body } = await deleteTaskController.execute(
    req.params.id,
  );

  res.status(statusCode).send(body);
});

app.patch("/lists/:id/share", async (req, res) => {
  const shareListRepository = new PostgresShareListRepository();
  const shareListUseCase = new ShareListUseCase(shareListRepository);
  const shareListController = new ShareListController(shareListUseCase);

  const { statusCode, body } = await shareListController.execute(
    req.params.id,
    req.body.user_id,
  );

  res.status(statusCode).send(body);
});

app.listen(PORT, () => {
  console.log(`Server running on address http://localhost:${PORT}`);
});
