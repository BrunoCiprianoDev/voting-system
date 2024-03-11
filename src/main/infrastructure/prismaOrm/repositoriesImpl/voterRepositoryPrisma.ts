import { IListVoters, IVoter } from '../../../../domain/voter/model/voter';
import { IVoterRepository } from '../../../../domain/voter/repository/voterRepository';
import BaseRepositoryPrisma from './baseRepositoryPrisma';

export class VoterRepositoryPrisma extends BaseRepositoryPrisma implements IVoterRepository {
  constructor() {
    super();
  }

  public async create(
    voters: { id: string; name: string; email: string; registration: string; electionId: string }[],
  ): Promise<void> {
    try {
      await this.dbClientInstance.voter.createMany({ data: voters });
    } catch (error) {
      this.handleError(error);
    }
  }

  public async updateEmail({ id, email }: { id: string; email: string }): Promise<void> {
    try {
      await this.dbClientInstance.voter.update({ where: { id }, data: { email } });
    } catch (error) {
      this.handleError(error);
    }
  }

  public async findById(id: string): Promise<IVoter | null> {
    try {
      return this.dbClientInstance.voter.findUnique({
        where: { id },
        include: {
          election: true,
        },
      });
    } catch (error) {
      this.handleError(error);
    }
  }

  public async findByEmail(email: string): Promise<IVoter | null> {
    try {
      return this.dbClientInstance.voter.findFirst({
        where: { email },
        include: {
          election: true,
        },
      });
    } catch (error) {
      this.handleError(error);
    }
  }

  public async findAll({
    page,
    size,
    contains,
  }: {
    page: number;
    size: number;
    contains: string;
  }): Promise<IListVoters[]> {
    try {
      return await this.dbClientInstance.voter.findMany({
        where: {
          name: {
            contains,
          },
        },
        skip: (page - 1) * size,
        take: +size,
        include: {
          election: false,
        },
      });
    } catch (error) {
      this.handleError(error);
    }
  }

  public async findByRegistration(registration: string): Promise<IVoter | null> {
    try {
      return this.dbClientInstance.voter.findFirst({
        where: { registration },
        include: {
          election: true,
        },
      });
    } catch (error) {
      this.handleError(error);
    }
  }

  public async deleteByElectionId(electionId: string): Promise<void> {
    try {
      await this.dbClientInstance.voter.deleteMany({ where: { electionId } });
    } catch (error) {
      this.handleError(electionId);
    }
  }
}
