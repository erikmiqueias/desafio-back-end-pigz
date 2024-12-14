import {
  CompleteTaskController,
  CreateListController,
  CreateTaskController,
  CreateUserController,
  DeleteListController,
  DeleteTaskController,
  ShareListController,
} from "../controllers";
import {
  PostgresCompleteTaskRepository,
  PostgresCreateListRepository,
  PostgresCreateTaskRepository,
  PostgresCreateUserRepository,
  PostgresDeleteListRepository,
  PostgresDeleteTaskRepository,
  PostgresGetUserByEmailRepository,
  PostgresShareListRepository,
} from "../repositories";
import {
  CompleteTaskUseCase,
  CreateListUseCase,
  CreateTaskUseCase,
  CreateUserUseCase,
  DeleteListUseCase,
  DeleteTaskUseCase,
  ShareListUseCase,
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

export const makeCreateTaskController = () => {
  const createTaskRepository = new PostgresCreateTaskRepository();
  const createTaskUseCase = new CreateTaskUseCase(createTaskRepository);
  const createTaskController = new CreateTaskController(createTaskUseCase);

  return createTaskController;
};

export const makeCompleteTaskController = () => {
  const completeTaskRepository = new PostgresCompleteTaskRepository();
  const completeTaskUseCase = new CompleteTaskUseCase(completeTaskRepository);
  const completeTaskController = new CompleteTaskController(
    completeTaskUseCase,
  );

  return completeTaskController;
};

export const makeDeleteTaskController = () => {
  const deleteTaskRepository = new PostgresDeleteTaskRepository();
  const deleteTaskUseCase = new DeleteTaskUseCase(deleteTaskRepository);
  const deleteTaskController = new DeleteTaskController(deleteTaskUseCase);

  return deleteTaskController;
};

export const makeShareListController = () => {
  const shareListRepository = new PostgresShareListRepository();
  const shareListUseCase = new ShareListUseCase(shareListRepository);
  const shareListController = new ShareListController(shareListUseCase);

  return shareListController;
};
