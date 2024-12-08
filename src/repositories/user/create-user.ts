import { User } from "@prisma/client";
import { IPostgresCreateUserRepository } from "../../interfaces/repositories/protocols";
import { CreateUserParams } from "../../types/user";
import { prisma } from "../../../prisma/prisma";

export class PostgresCreateUserRepository
  implements IPostgresCreateUserRepository
{
  async execute(params: CreateUserParams): Promise<User> {
    const user = await prisma.user.create({
      data: {
        name: params.name,
        email: params.email,
        password: params.password,
        is_admin: params.is_admin,
      },
    });
    return user;
  }
}
