import express from "express";
import { config } from "dotenv";
import { authMiddleware, generateToken } from "./middlewares/auth/auth";
import {
  makeCompleteTaskController,
  makeCreateListController,
  makeCreateTaskController,
  makeCreateUserController,
  makeDeleteListController,
  makeDeleteTaskController,
  makeShareListController,
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
  const { token } = req.body;

  if (!token) {
    res.status(400).send("Missing parameters");
    return;
  }

  const generatedToken = generateToken({ token });
  res.status(200).send({ generateToken: generatedToken });
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
  const deleteTaskController = makeDeleteTaskController();
  const { statusCode, body } = await deleteTaskController.execute(
    req.params.id,
  );

  res.status(statusCode).send(body);
});

app.patch("/lists/:id/share", async (req, res) => {
  const shareListController = makeShareListController();

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
