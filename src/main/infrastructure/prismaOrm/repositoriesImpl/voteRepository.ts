import { IVote } from "../../../../domain/vote/models/vote";
import { IVoteRepository } from "../../../../domain/vote/repository/voteRepository";
import BaseRepositoryPrisma from "./baseRepositoryPrisma";

export class VoteRepositoryPrisma extends BaseRepositoryPrisma implements IVoteRepository {

  constructor() {
    super();
  }

  public async create(votes: IVote[]): Promise<void> {
    try {
      await this.dbClientInstance.vote.createMany({ data: votes })
    } catch (error) {
      this.handleError(error);
    }
  }
  public async getVotesByVoterId(voterId: string): Promise<IVote[]> {
    try {
      return this.dbClientInstance.vote.findMany({
        where: { voterId },
        include: {
          voter: {
            select: {
              id: true,
              registration: true,
              name: true,
              email: true,
              election: true,
              alreadyVoted: true,
            }
          }
        }
      });
    } catch (error) {
      this.handleError(error);
    }
  }
  public async getVotesByCandidateId(candidateId: string): Promise<IVote[]> {
    try {
      return this.dbClientInstance.vote.findMany({
        where: { candidateId },
        include: {
          voter: {
            select: {
              id: true,
              registration: true,
              name: true,
              email: true,
              election: true,
              alreadyVoted: true,
            }
          }
        }
      });
    } catch (error) {
      this.handleError(error);
    }
  }
  public async countVotesByCandidateId(candidateId: string): Promise<number> {
    try {
      return this.dbClientInstance.vote.count({ where: { candidateId } });
    } catch (error) {
      this.handleError(error);
    }
  }
  public async countTotalVotes(): Promise<number> {
    try {
      return this.dbClientInstance.vote.count();
    } catch (error) {
      this.handleError(error);
    }
  }

}