import { IPositionRepository } from "../../position/repository/positionRepository";
import { IuuidGenerator } from "../../util/adapters/uuidGenerator";
import { BadRequestError, NotFoundError } from "../../util/errors/appErrors";
import { ErrorHandlerServices } from "../../util/errors/handlerError";
import { ICandidate, ICandidateCreateData } from "../models/candidate";
import { ICandidateRepository } from "../repository/candidateRepository";

export const ERROR_MSG_INVALID_CANDIDATE_NAME = 'Nome inválido para o candidato'
export const ERROR_MSG_INVALID_CANDIDATE_POSITION_ID = 'Cargo inválido'

export interface ICreateCandidateService {
  execute(candidate: ICandidateCreateData): Promise<ICandidate>;
}

export class CreateCandidateService extends ErrorHandlerServices implements ICreateCandidateService {

  constructor(
    private uuidGenerator: IuuidGenerator,
    private candidateRepository: ICandidateRepository,
    private positionRepository: IPositionRepository,
  ) {
    super();
  }

  public async execute(candidate: ICandidateCreateData): Promise<ICandidate> {
    try {
      if (!candidate.name || candidate.name.trim() === '') {
        throw new BadRequestError(ERROR_MSG_INVALID_CANDIDATE_NAME);
      }
      const position = await this.positionRepository.findById(candidate.positionId);
      if (!position) {
        throw new NotFoundError(ERROR_MSG_INVALID_CANDIDATE_POSITION_ID);
      }

      const id = await this.uuidGenerator.generate();
      const candidateCreate = {
        name: candidate.name,
        position,
        id
      }
      await this.candidateRepository.create(candidateCreate);
      return candidateCreate;
    } catch (error) {
      this.handleError(error);
    }
  }

}