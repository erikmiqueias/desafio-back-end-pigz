import { User } from "@prisma/client";
import { IGetUserByEmailUseCase } from "../../interfaces/use-case/protocols";
import { IPostgresGetUserByEmailRepository } from "../../interfaces/repositories/protocols";

export class GetUserByEmailUseCase implements IGetUserByEmailUseCase {
  constructor(
    private readonly postgresGetUserByEmailRepository: IPostgresGetUserByEmailRepository,
  ) {}
  async execute(email: string): Promise<User> {
    if (!email) {
      throw new Error("Missing parameters");
    }

    const user = await this.postgresGetUserByEmailRepository.execute(email);

    return user;
  }
}
