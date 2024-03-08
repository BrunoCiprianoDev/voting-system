import { BadRequestError, NotFoundError } from "../../util/errors/appErrors";
import { ErrorHandlerServices } from "../../util/errors/handlerError";
import { IElection } from "../models/election";
import { IElectionRepository } from "../repository/electionRepository";

export const ERROR_MSG_ELECTION_TITLE_INVALID = 'O atributo titulo não pode estar vazio';
export const ERROR_MSG_ELECTION_DESCRIPTION_INVALID = 'O atributo descrição não pode estar vazio';
export const ERROR_MSG_ELECTION_NOT_FOUND = 'O cargo que está tentando alterar não foi encontrado'

export interface IUpdateElectionService {
  execute(data: IElection): Promise<IElection>;
}

export class UpdateElecitionService extends ErrorHandlerServices implements IUpdateElectionService {

  constructor(private electionRespository: IElectionRepository) {
    super();
  }

  public async execute(data: IElection): Promise<IElection> {
    try {
      const isExists = await this.electionRespository.findById(data.id);
      if (!isExists) {
        throw new NotFoundError(ERROR_MSG_ELECTION_NOT_FOUND);
      }
      if (!data.title || data.title.trim() === '') {
        throw new BadRequestError(ERROR_MSG_ELECTION_TITLE_INVALID);
      }
      if (!data.description || data.description.trim() === '') {
        throw new BadRequestError(ERROR_MSG_ELECTION_DESCRIPTION_INVALID);
      }
      const updateElection = {
        ...data,
      }
      await this.electionRespository.update(updateElection);
      return data;
    } catch (error) {
      this.handleError(error);
    }
  }

}