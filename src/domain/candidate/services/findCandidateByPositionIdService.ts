import { ErrorHandlerServices } from '../../util/errors/handlerError';
import { ICandidate } from '../models/candidate';
import { ICandidateRepository } from '../repository/candidateRepository';

export const ERROR_MSG_CANDIDATE_NOT_FOUND = 'O candidato que está tentando buscar não foi encontrado';

export interface IFindCandidateByPositionIdService {
  execute(positionId: string): Promise<ICandidate[]>;
}

export class FindCandidateByPositionIdService
  extends ErrorHandlerServices
  implements IFindCandidateByPositionIdService
{
  constructor(private candidateRepository: ICandidateRepository) {
    super();
  }

  public async execute(positionId: string): Promise<ICandidate[]> {
    try {
      return await this.candidateRepository.findByPositionId(positionId);
    } catch (error) {
      this.handleError(error);
    }
  }
}
