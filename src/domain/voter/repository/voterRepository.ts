import { IListVoters, IVoter } from '../model/voter';

export interface IVoterRepository {
  create(
    voters: { id: string; name: string; email: string; registration: string; electionId: string }[],
  ): Promise<void>;
  updateEmail(data: { id: string; email: string }): Promise<void>;
  findAll(data: { page: number; size: number; contains: string }): Promise<IListVoters[]>;
  findById(id: string): Promise<IVoter | null>;
  findByRegistration(registration: string): Promise<IVoter | null>;
  deleteByElectionId(electionId: string): Promise<void>;
}
