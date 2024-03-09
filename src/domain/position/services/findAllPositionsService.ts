import { ErrorHandlerServices } from '../../util/errors/handlerError';
import { IPosition } from '../models/position';
import { IPositionRepository } from '../repository/positionRepository';

export interface IFindAllPositionsService {
  execute(data: { contains: string; page: number; size: number }): Promise<IPosition[]>;
}

export class FindAllPositionsService extends ErrorHandlerServices implements IFindAllPositionsService {
  constructor(private positionRepository: IPositionRepository) {
    super();
  }

  public async execute(data: { contains: string; page: number; size: number }): Promise<IPosition[]> {
    try {
      return await this.positionRepository.findAll(data);
    } catch (error) {
      this.handleError(error);
    }
  }
}
