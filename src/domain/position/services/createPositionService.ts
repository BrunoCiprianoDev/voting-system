import { IuuidGenerator } from "../../util/adapters/uuidGenerator";
import { BadRequestError } from "../../util/errors/appErrors";
import { ErrorHandlerServices } from "../../util/errors/handlerError";
import { IPosition } from "../models/position";
import { IPositionRepository } from "../repository/positionRepository";

export const ERROR_MSG_POSITION_NAME_INVALID = 'O atributo name não pode estar vazio';
export const ERROR_MSG_POSITION_DESCRIPTION_INVALID = 'O atributo description não pode estar vazio';

export interface ICreatePositionService {
  execute(data: { name: string, description: string }): Promise<IPosition>;
}

export class CreatePositionService extends ErrorHandlerServices implements ICreatePositionService {

  constructor(
    private positionRespository: IPositionRepository,
    private uuidGenerator: IuuidGenerator
  ) {
    super();
  }

  public async execute(data: { name: string; description: string; }): Promise<IPosition> {
    try {
      if (!data.name || data.name.trim() === '') {
        throw new BadRequestError(ERROR_MSG_POSITION_NAME_INVALID);
      }
      if (!data.description || data.description.trim() === '') {
        throw new BadRequestError(ERROR_MSG_POSITION_DESCRIPTION_INVALID);
      }
      const id = await this.uuidGenerator.generate();
      const newPosition = {
        ...data,
        id
      };
      await this.positionRespository.create(newPosition);
      return newPosition;
    } catch (error) {
      this.handleError(error);
    }
  }

}