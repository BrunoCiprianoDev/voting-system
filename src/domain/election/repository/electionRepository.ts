import { IElection } from "../models/election";

export interface IElectionRepository {
  create(election: IElection): Promise<void>;
  update(election: IElection): Promise<void>;
  findAll(): Promise<IElection[]>;
  findById(id: string): Promise<IElection | null>;
  delete(id: string): Promise<void>;
}