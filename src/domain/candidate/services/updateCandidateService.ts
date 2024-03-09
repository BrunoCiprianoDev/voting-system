import { IPositionRepository } from "../../position/repository/positionRepository";
import { BadRequestError, NotFoundError } from "../../util/errors/appErrors";
import { ErrorHandlerServices } from "../../util/errors/handlerError";
import { ICandidate, ICandidateUpdateData } from "../models/candidate";
import { ICandidateRepository } from "../repository/candidateRepository";

export const ERROR_MSG_INVALID_CANDIDATE_NAME = 'Nome inválido para o candidato'
export const ERROR_MSG_INVALID_CANDIDATE_POSITION_ID = 'Cargo inválido'

export interface IUpdateCandidateService {
  execute(candidate: ICandidateUpdateData): Promise<ICandidate>;
}

export class UpdateCandidateService extends ErrorHandlerServices implements IUpdateCandidateService {

  constructor(
    private candidateRepository: ICandidateRepository,
    private positionRepository: IPositionRepository,
  ) {
    super();
  }

  public async execute(candidate: ICandidateUpdateData): Promise<ICandidate> {
    try {
      if (!candidate.name || candidate.name.trim() === '') {
        throw new BadRequestError(ERROR_MSG_INVALID_CANDIDATE_NAME);
      }
      const position = await this.positionRepository.findById(candidate.positionId);
      if (!position) {
        throw new NotFoundError(ERROR_MSG_INVALID_CANDIDATE_POSITION_ID);
      }
      const candidateUpdate = {
        name: candidate.name,
        position,
        id: candidate.id
      }
      await this.candidateRepository.update(candidateUpdate);
      return candidateUpdate;
    } catch (error) {
      this.handleError(error);
    }
  }

}