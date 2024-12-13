import express from "express";
import { config } from "dotenv";
import {
  CreateUserController,
  CreateListController,
  CreateTaskController,
  CompleteTaskController,
  DeleteListController,
  DeleteTaskController,
  ShareListController,
} from "./controllers/index";
import {
  CreateUserUseCase,
  CreateListUseCase,
  CreateTaskUseCase,
  CompleteTaskUseCase,
  DeleteTaskUseCase,
  ShareListUseCase,
  DeleteListUseCase,
} from "./use-case/index";
import {
  PostgresCreateUserRepository,
  PostgresCreateTaskRepository,
  PostgresCreateListRepository,
  PostgresDeleteListRepository,
  PostgresCompleteTaskRepository,
  PostgresDeleteTaskRepository,
  PostgresShareListRepository,
  PostgresGetUserByEmailRepository,
} from "./repositories/index";
import { authMiddleware, generateToken } from "./middlewares/auth/auth";

config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());

app.post("/users", authMiddleware, async (req, res) => {
  const getUserByEmailRepository = new PostgresGetUserByEmailRepository();
  const createUserRepository = new PostgresCreateUserRepository();
  const createUserUseCase = new CreateUserUseCase(
    createUserRepository,
    getUserByEmailRepository,
  );
  const createUserController = new CreateUserController(createUserUseCase);

  const { statusCode, body } = await createUserController.execute(req);

  res.status(statusCode).send(body);
});

app.post("/generate-token", (req, res): void => {
  const { email, id } = req.body;

  if (!email || !id) {
    res.status(400).send("Missing parameters");
    return;
  }

  const token = generateToken({ id, email });
  res.status(200).send({ token });
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
    req.body.can_edit,
  );

  res.status(statusCode).send(body);
});

app.listen(PORT, () => {
  console.log(`Server running on address http://localhost:${PORT}`);
});
