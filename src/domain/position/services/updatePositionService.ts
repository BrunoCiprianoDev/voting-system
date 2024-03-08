import { BadRequestError, NotFoundError } from "../../util/errors/appErrors";
import { ErrorHandlerServices } from "../../util/errors/handlerError";
import { IPosition } from "../models/position";
import { IPositionRepository } from "../repository/positionRepository";

export const ERROR_MSG_POSITION_NAME_INVALID = 'O atributo nome não pode estar vazio';
export const ERROR_MSG_POSITION_DESCRIPTION_INVALID = 'O atributo descrição não pode estar vazio';
export const ERROR_MSG_POSITION_NOT_FOUND = 'O cargo que está tentando alterar não foi encontrado'

export interface IUpdatePositionService {
  execute(data: { name: string, description: string }): Promise<IPosition>;
}

export class UpdatePositionService extends ErrorHandlerServices implements IUpdatePositionService {

  constructor(private positionRespository: IPositionRepository) {
    super();
  }

  public async execute(data: IPosition): Promise<IPosition> {
    try {
      const isExists = await this.positionRespository.findById(data.id);
      if (!isExists) {
        throw new NotFoundError(ERROR_MSG_POSITION_NOT_FOUND);
      }
      if (!data.name || data.name.trim() === '') {
        throw new BadRequestError(ERROR_MSG_POSITION_NAME_INVALID);
      }
      if (!data.description || data.description.trim() === '') {
        throw new BadRequestError(ERROR_MSG_POSITION_DESCRIPTION_INVALID);
      }
      await this.positionRespository.update(data);
      return data;
    } catch (error) {
      this.handleError(error);
    }
  }

}