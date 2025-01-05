import { Lists } from "@prisma/client";
import { IDeleteListUseCase } from "../../interfaces/use-case/protocols";
import { IPostgresDeleteListRepository } from "../../interfaces/repositories/protocols";

export class DeleteListUseCase implements IDeleteListUseCase {
  constructor(
    private readonly postgresDeleteListRepository: IPostgresDeleteListRepository,
  ) {}
  async execute(listId: string): Promise<Lists> {
    if (!listId) {
      throw new Error("An unknown error occurred");
    }

    const list = this.postgresDeleteListRepository.execute(listId);

    return list;
  }
}
