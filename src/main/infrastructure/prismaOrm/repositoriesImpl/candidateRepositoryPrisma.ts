import { ICandidate } from "../../../../domain/candidate/models/candidate";
import { ICandidateRepository } from "../../../../domain/candidate/repository/candidateRepository";
import BaseRepositoryPrisma from "./baseRepositoryPrisma";

export class CandidateRepositoryPrisma extends BaseRepositoryPrisma implements ICandidateRepository {

  constructor() {
    super();
  }

  public async create({ id, name, position, votes }: ICandidate): Promise<void> {
    try {
      await this.dbClientInstance.candidate.create({
        data: {
          id, name, positionId: position.id, votes
        }
      });
    } catch (error) {
      this.handleError(error);
    }
  }

  public async update({ id, name, position, votes }: ICandidate): Promise<void> {
    try {
      await this.dbClientInstance.candidate.update({
        where: { id },
        data: {
          name, positionId: position.id, votes
        }
      });
    } catch (error) {
      this.handleError(error);
    }
  }

  public async findById(id: string): Promise<ICandidate | null> {
    try {
      return await this.dbClientInstance.candidate.findUnique({
        where: { id },
        include: {
          position: {
            include: {
              election: true
            }
          }
        }
      });
    } catch (error) {
      this.handleError(error);
    }
  }
  public async findByPositionId(positionId: string): Promise<ICandidate[]> {
    try {
      return await this.dbClientInstance.candidate.findMany({
        where: {
          position: { id: positionId }
        },
        include: {
          position: {
            include: {
              election: true
            }
          }
        }
      })
    } catch (error) {
      this.handleError(error);
    }
  }
  public async findAll({ page, size, contains }: { page: number, size: number, contains: string }): Promise<ICandidate[]> {
    try {
      return await this.dbClientInstance.candidate.findMany({
        where: {
          name: {
            contains,
          },
        },
        skip: (page - 1) * size,
        take: +size,
        include: {
          position: {
            include: {
              election: true
            }
          }
        }
      });
    } catch (error) {
      this.handleError(error);
    }
  }
  public async delete(id: string): Promise<void> {
    try {
      await this.dbClientInstance.candidate.delete({ where: { id } })
    } catch (error) {
      this.handleError(error);
    }
  }


}