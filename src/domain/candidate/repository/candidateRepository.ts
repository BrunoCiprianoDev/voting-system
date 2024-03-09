import { ICandidate } from '../models/candidate';

export interface ICandidateRepository {
  create(candidate: ICandidate): Promise<void>;
  update(candidate: ICandidate): Promise<void>;
  findById(id: string): Promise<ICandidate | null>;
  findByPositionId(positionId: string): Promise<ICandidate[]>;
  findAll(data: { page: number; size: number; contains: string }): Promise<ICandidate[]>;
  delete(id: string): Promise<void>;
}
