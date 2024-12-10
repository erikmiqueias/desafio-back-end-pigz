import express from "express";
import { config } from "dotenv";
import { CreateUserController } from "./controllers/user/create-user";
import { CreateUserUseCase } from "./use-case/user/create-user";
import { PostgresCreateUserRepository } from "./repositories/user/create-user";

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

app.listen(PORT, () => {
  console.log(`Server running on address http://localhost:${PORT}`);
});
