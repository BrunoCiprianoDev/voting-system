import { IListVoters } from "../../../../domain/voter/model/voter";
import { IVoterRepository } from "../../../../domain/voter/repository/voterRepository";
import BaseRepositoryPrisma from "./baseRepositoryPrisma";


export class VoterRepositoryPrisma extends BaseRepositoryPrisma implements IVoterRepository {
  constructor() {
    super();
  }

  public async create(voters: { id: string, name: string, email: string, registration: string, electionId: string }[]): Promise<void> {
    try {
      await this.dbClientInstance.voter.createMany({ data: voters })
    } catch (error) {
      this.handleError(error);
    }
  }

  public async findAll({ page, size, contains }: { page: number, size: number, contains: string }): Promise<IListVoters[]> {
    try {
      return await this.dbClientInstance.voter.findMany(
        {
          where: {
            name: {
              contains,
            },
          },
          skip: (page - 1) * size,
          take: +size,
          include: {
            election: false
          }
        }
      )
    } catch (error) {
      this.handleError(error);
    }
  }

}