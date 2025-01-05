import { User } from "@prisma/client";
import { ICreateUserUseCase } from "../../interfaces/use-case/protocols";
import { CreateUserParams } from "../../types/user";
import { v4 as uuidv4 } from "uuid";
import {
  IPostgresCreateUserRepository,
  IPostgresGetUserByEmailRepository,
} from "../../interfaces/repositories/protocols";
import bcrypt from "bcrypt";
import { EmailAlreadyExists } from "../../errors/errors";
export class CreateUserUseCase implements ICreateUserUseCase {
  constructor(
    private readonly postgresCreateUserRepository: IPostgresCreateUserRepository,
    private readonly postgresGetUserByEmailRepository: IPostgresGetUserByEmailRepository,
  ) {}
  async execute(createUserParams: CreateUserParams): Promise<User> {
    const emailAlreadyExists =
      await this.postgresGetUserByEmailRepository.execute(
        createUserParams.email,
      );

    if (emailAlreadyExists) {
      throw new EmailAlreadyExists(createUserParams.email);
    }

    const userId = uuidv4();
    const hashdePassword = await bcrypt.hash(createUserParams.password, 10);

    const user: CreateUserParams = {
      ...createUserParams,
      id: userId,
      password: hashdePassword,
    };

    const userCreated = await this.postgresCreateUserRepository.execute(user);

    return userCreated;
  }
}
