import { ErrorHandlerServices } from "../../util/errors/handlerError";
import { ICandidate } from "../models/candidate";
import { ICandidateRepository } from "../repository/candidateRepository";

export interface IFindAllCandidatesService {
  execute(data: { page: number, size: number, contains: string }): Promise<ICandidate[]>;
}

export class FindAllCandidatesService extends ErrorHandlerServices implements IFindAllCandidatesService {

  constructor(private candidateRepository: ICandidateRepository) {
    super();
  }

  public async execute(data: { page: number, size: number, contains: string }): Promise<ICandidate[]> {
    try {
      return this.candidateRepository.findAll(data);
    } catch (error) {
      this.handleError(error);
    }
  }

}