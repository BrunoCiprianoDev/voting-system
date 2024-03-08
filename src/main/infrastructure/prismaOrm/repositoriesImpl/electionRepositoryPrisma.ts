
import { IElection } from '../../../../domain/election/models/election';
import { IElectionRepository } from '../../../../domain/election/repository/electionRepository';
import BaseRepositoryPrisma from './baseRepositoryPrisma';

export class ElectionRepositoryPrisma extends BaseRepositoryPrisma implements IElectionRepository {
  constructor() {
    super();
  }

  public async create(election: IElection): Promise<void> {
    try {
      await this.dbClientInstance.election.create({ data: election })
    } catch (error) {
      this.handleError(error);
    }
  }


  public async update(election: IElection): Promise<void> {
    try {
      await this.dbClientInstance.election.update({ where: { id: election.id }, data: election })
    } catch (error) {
      this.handleError(error);
    }
  }

  public async findAll(): Promise<IElection[]> {
    try {
      return await this.dbClientInstance.election.findMany({});
    } catch (error) {
      this.handleError(error);
    }
  }

  public async findById(id: string): Promise<IElection | null> {
    try {
      return await this.dbClientInstance.election.findUnique({ where: { id } });
    } catch (error) {
      this.handleError(error);
    }
  }

  public async delete(id: string): Promise<void> {
    try {
      await this.dbClientInstance.election.delete({ where: { id } });
    } catch (error) {
      this.handleError(error);
    }
  }



}