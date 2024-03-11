import { IElectionRepository } from '../../election/repository/electionRepository';
import { IuuidGenerator } from '../../util/adapters/uuidGenerator';
import { BadRequestError, NotFoundError } from '../../util/errors/appErrors';
import { ErrorHandlerServices } from '../../util/errors/handlerError';
import { IPosition, IPositionCreateData } from '../models/position';
import { IPositionRepository } from '../repository/positionRepository';

export const ERROR_MSG_POSITION_NAME_INVALID = 'O atributo name não pode estar vazio';
export const ERROR_MSG_POSITION_DESCRIPTION_INVALID = 'O atributo description não pode estar vazio';
export const ERROR_MSG_ELECTION_ID_NOT_FOUND = 'Eleição inválida';

export interface ICreatePositionService {
  execute(data: IPositionCreateData): Promise<IPosition>;
}

export class CreatePositionService extends ErrorHandlerServices implements ICreatePositionService {
  constructor(
    private positionRespository: IPositionRepository,
    private electionRepository: IElectionRepository,
    private uuidGenerator: IuuidGenerator,
  ) {
    super();
  }

  public async execute(data: IPositionCreateData): Promise<IPosition> {
    try {
      if (!data.name || data.name.trim() === '') {
        throw new BadRequestError(ERROR_MSG_POSITION_NAME_INVALID);
      }
      if (!data.description || data.description.trim() === '') {
        throw new BadRequestError(ERROR_MSG_POSITION_DESCRIPTION_INVALID);
      }
      const election = await this.electionRepository.findById(data.electionId);
      if (!election) {
        throw new NotFoundError(ERROR_MSG_ELECTION_ID_NOT_FOUND);
      }
      const id = await this.uuidGenerator.generate();
      const newPosition = {
        ...data,
        election,
        id,
      };
      await this.positionRespository.create(newPosition);
      return newPosition;
    } catch (error) {
      this.handleError(error);
    }
  }
}
