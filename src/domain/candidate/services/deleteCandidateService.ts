import { NotFoundError } from "../../util/errors/appErrors";
import { ErrorHandlerServices } from "../../util/errors/handlerError";
import { ICandidateRepository } from "../repository/candidateRepository";

export const ERROR_MSG_CANDIDATE_NOT_FOUND = 'O candidato que está tentando deletar não foi encontrado'

export interface IDeleteCandidateService {
  execute(id: string): Promise<void>;
}

export class DeleteCandidateService extends ErrorHandlerServices implements IDeleteCandidateService {

  constructor(private candidateRepository: ICandidateRepository) {
    super();
  }

  public async execute(id: string): Promise<void> {
    try {
      const candidateExists = await this.candidateRepository.findById(id);
      if (!candidateExists) {
        throw new NotFoundError(ERROR_MSG_CANDIDATE_NOT_FOUND);
      }
      await this.candidateRepository.delete(id);
    } catch (error) {
      this.handleError(error);
    }
  }

}