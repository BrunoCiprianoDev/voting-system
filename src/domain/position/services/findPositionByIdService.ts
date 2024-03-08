import { NotFoundError } from "../../util/errors/appErrors";
import { ErrorHandlerServices } from "../../util/errors/handlerError";
import { IPosition } from "../models/position";
import { IPositionRepository } from "../repository/positionRepository";

export const ERROR_MSG_POSITION_NOT_FOUND_BY_ID = 'Cargo não encontrado pelo ID';

export interface IFindPositionByIdService {
  execute(id: string): Promise<IPosition>
}

export class FindPositionByIdService extends ErrorHandlerServices implements IFindPositionByIdService {

  constructor(private positionRepository: IPositionRepository) {
    super();
  }

  public async execute(id: string): Promise<IPosition> {
    try {
      const result = await this.positionRepository.findById(id);
      if (!result) {
        throw new NotFoundError(ERROR_MSG_POSITION_NOT_FOUND_BY_ID);
      }
      return result;
    } catch (error) {
      this.handleError(error);
    }
  }

}