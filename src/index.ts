import express from "express";
import { config } from "dotenv";
import { CreateUserController } from "./controllers/user/create-user";
import { CreateUserUseCase } from "./use-case/user/create-user";
import { PostgresCreateUserRepository } from "./repositories/user/create-user";
import { PostgresCreateListRepository } from "./repositories/list/create-list";
import { CreateListUseCase } from "./use-case/list/create-list";
import { CreateListController } from "./controllers/list/create-list";

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

app.listen(PORT, () => {
  console.log(`Server running on address http://localhost:${PORT}`);
});
