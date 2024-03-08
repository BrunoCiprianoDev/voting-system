import { ErrorHandlerServices } from "../../util/errors/handlerError";
import { IElection } from "../models/election";
import { IElectionRepository } from "../repository/electionRepository";

export interface IFindAllElectionsService {
  execute(): Promise<IElection[]>;
}

export class FindAllElectionsService extends ErrorHandlerServices implements IFindAllElectionsService {
  constructor(private electionRepository: IElectionRepository) {
    super();
  }

  public async execute(): Promise<IElection[]> {
    try {
      return await this.electionRepository.findAll();
    } catch (error) {
      this.handleError(error);
    }
  }
}