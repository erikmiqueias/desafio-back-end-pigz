import { User } from "@prisma/client";
import { prisma } from "../../../prisma/prisma";
import { IPostgresGetUserByEmailRepository } from "../../interfaces/repositories/protocols";

export class PostgresGetUserByEmailRepository
  implements IPostgresGetUserByEmailRepository
{
  async execute(email: string): Promise<User> {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    return user as User;
  }
}
