import express from "express";
import { config } from "dotenv";
import { DeleteTaskController, ShareListController } from "./controllers/index";
import { DeleteTaskUseCase, ShareListUseCase } from "./use-case/index";
import {
  PostgresDeleteTaskRepository,
  PostgresShareListRepository,
} from "./repositories/index";
import { authMiddleware, generateToken } from "./middlewares/auth/auth";
import {
  makeCompleteTaskController,
  makeCreateListController,
  makeCreateTaskController,
  makeCreateUserController,
  makeDeleteListController,
} from "./factories";

config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());

app.post("/users", authMiddleware, async (req, res) => {
  const createUserController = makeCreateUserController();

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
  const createListController = makeCreateListController();

  const { statusCode, body } = await createListController.execute(
    req.params.id,
    req,
  );

  res.status(statusCode).send(body);
});

app.delete("/lists/:id", async (req, res) => {
  const deleteListController = makeDeleteListController();

  const { statusCode, body } = await deleteListController.execute(
    req.params.id,
  );

  res.status(statusCode).send(body);
});

app.post("/lists/:id/tasks", async (req, res) => {
  const createTaskController = makeCreateTaskController();

  const { statusCode, body } = await createTaskController.execute(
    req.params.id,
    req,
  );

  res.status(statusCode).send(body);
});

app.patch("/tasks/:id", async (req, res) => {
  const completeTaskController = makeCompleteTaskController();

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
