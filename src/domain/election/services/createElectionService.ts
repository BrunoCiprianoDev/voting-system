import { IElectionRepository } from "../repository/electionRepository";
import { IuuidGenerator } from "../../util/adapters/uuidGenerator";
import { BadRequestError } from "../../util/errors/appErrors";
import { ErrorHandlerServices } from "../../util/errors/handlerError";
import { IElection, IElectionCreateData } from "../models/election";

export const ERROR_MSG_ELECTION_TITLE_INVALID = 'O atributo titulo não pode estar vazio';
export const ERROR_MSG_ELECTION_DESCRIPTION_INVALID = 'O atributo descrição não pode estar vazio';

export interface ICreateElectionService {
  execute(data: IElectionCreateData): Promise<IElection>;
}

export class CreateElectionService extends ErrorHandlerServices implements ICreateElectionService {

  constructor(
    private electionRepository: IElectionRepository,
    private uuidGenerator: IuuidGenerator
  ) {
    super();
  }

  public async execute(data: IElectionCreateData): Promise<IElection> {
    try {
      if (!data.title || data.title.trim() === '') {
        throw new BadRequestError(ERROR_MSG_ELECTION_TITLE_INVALID);
      }
      if (!data.description || data.description.trim() === '') {
        throw new BadRequestError(ERROR_MSG_ELECTION_DESCRIPTION_INVALID);
      }
      const id = await this.uuidGenerator.generate();
      const newPosition = {
        ...data,
        id
      };
      await this.electionRepository.create(newPosition);
      return newPosition;
    } catch (error) {
      this.handleError(error);
    }
  }

}