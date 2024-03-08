import { NotFoundError } from "../../util/errors/appErrors";
import { ErrorHandlerServices } from "../../util/errors/handlerError";
import { IElection } from "../models/election";
import { IElectionRepository } from "../repository/electionRepository";

export const ERROR_MSG_ELECTION_NOT_FOUND_BY_ID = 'Eleição não encontrada pelo ID';

export interface IFindElectionByIdService {
  execute(id: string): Promise<IElection>
}

export class FindElectionByIdService extends ErrorHandlerServices implements IFindElectionByIdService {

  constructor(private electionRepository: IElectionRepository) {
    super();
  }

  public async execute(id: string): Promise<IElection> {
    try {
      const result = await this.electionRepository.findById(id);
      if (!result) {
        throw new NotFoundError(ERROR_MSG_ELECTION_NOT_FOUND_BY_ID);
      }
      return result;
    } catch (error) {
      this.handleError(error);
    }
  }

}