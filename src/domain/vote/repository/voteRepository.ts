import { IVote } from "../models/vote";

export interface IVoteRepository {
  create(vote: IVote[]): Promise<void>;
  getVotesByVoterId(voterId: string): Promise<IVote[]>;
  getVotesByCandidateId(candidateId: string): Promise<IVote[]>
  countVotesByCandidateId(candidateId: string): Promise<number>;
  countTotalVotes(): Promise<number>;
}