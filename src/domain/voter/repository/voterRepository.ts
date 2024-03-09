import { IListVoters } from "../model/voter";

export interface IVoterRepository {

  create(voters: { id: string, name: string, email: string, registration: string, electionId: string }[]): Promise<void>;
  // update(voter: IVoter): Promise<void>;
  findAll(data: { page: number, size: number, contains: string }): Promise<IListVoters[]>;


}