import { NotFoundError } from "../../util/errors/appErrors";
import { ErrorHandlerServices } from "../../util/errors/handlerError";
import { IPositionRepository } from "../repository/positionRepository";

export const ERROR_MSG_NOT_FOUND_POSITION_BY_DELETED = 'Id não encontrado';

export interface IDeletePosition {
  execute(id: string): Promise<void>;
}

export class deletePositionService extends ErrorHandlerServices implements IDeletePosition {
  constructor(private positionRepository: IPositionRepository) {
    super();
  }

  public async execute(id: string): Promise<void> {
    try {
      const isExists = await this.positionRepository.findById(id);
      if (!isExists) {
        throw new NotFoundError(ERROR_MSG_NOT_FOUND_POSITION_BY_DELETED);
      }
      await this.positionRepository.delete(id);
    } catch (error) {
      this.handleError(error);
    }
  }

}