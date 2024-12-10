import { User } from "@prisma/client";
import { ICreateUserUseCase } from "../../helpers/use-case/protocols";
import { CreateUserParams } from "../../types/user";
import { v4 as uuidv4 } from "uuid";
import { IPostgresCreateUserRepository } from "../../helpers/repositories/protocols";
import bcrypt from "bcrypt";
export class CreateUserUseCase implements ICreateUserUseCase {
  constructor(
    private readonly postgresCreateUserRepository: IPostgresCreateUserRepository,
  ) {}
  async execute(createUserParams: CreateUserParams): Promise<User> {
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