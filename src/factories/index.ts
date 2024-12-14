import {
  CreateListController,
  CreateUserController,
  DeleteListController,
} from "../controllers";
import {
  PostgresCreateListRepository,
  PostgresCreateUserRepository,
  PostgresDeleteListRepository,
  PostgresGetUserByEmailRepository,
} from "../repositories";
import {
  CreateListUseCase,
  CreateUserUseCase,
  DeleteListUseCase,
} from "../use-case";

export const makeCreateUserController = () => {
  const getUserByEmailRepository = new PostgresGetUserByEmailRepository();
  const createUserRepository = new PostgresCreateUserRepository();
  const createUserUseCase = new CreateUserUseCase(
    createUserRepository,
    getUserByEmailRepository,
  );
  const createUserController = new CreateUserController(createUserUseCase);

  return createUserController;
};

export const makeCreateListController = () => {
  const createListRepository = new PostgresCreateListRepository();
  const createListUseCase = new CreateListUseCase(createListRepository);
  const createListController = new CreateListController(createListUseCase);

  return createListController;
};

export const makeDeleteListController = () => {
  const deleteListRepository = new PostgresDeleteListRepository();
  const deleteListUseCase = new DeleteListUseCase(deleteListRepository);
  const deleteListController = new DeleteListController(deleteListUseCase);

  return deleteListController;
};
