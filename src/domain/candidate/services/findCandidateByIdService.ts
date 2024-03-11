import { NotFoundError } from '../../util/errors/appErrors';
import { ErrorHandlerServices } from '../../util/errors/handlerError';
import { ICandidate } from '../models/candidate';
import { ICandidateRepository } from '../repository/candidateRepository';

export const ERROR_MSG_CANDIDATE_NOT_FOUND = 'O candidato que está tentando buscar não foi encontrado';

export interface IFindCandidateByIdService {
  execute(id: string): Promise<ICandidate>;
}

export class FindCandidateByIdService extends ErrorHandlerServices implements IFindCandidateByIdService {
  constructor(private candidateRepository: ICandidateRepository) {
    super();
  }

  public async execute(id: string): Promise<ICandidate> {
    try {
      const candidateExists = await this.candidateRepository.findById(id);
      if (!candidateExists) {
        throw new NotFoundError(ERROR_MSG_CANDIDATE_NOT_FOUND);
      }
      return candidateExists;
    } catch (error) {
      this.handleError(error);
    }
  }
}
