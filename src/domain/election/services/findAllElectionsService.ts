import { ErrorHandlerServices } from '../../util/errors/handlerError';
import { IElection } from '../models/election';
import { IElectionRepository } from '../repository/electionRepository';

export interface IFindAllElectionsService {
  execute(isActive: boolean): Promise<IElection[]>;
}

export class FindAllElectionsService extends ErrorHandlerServices implements IFindAllElectionsService {
  constructor(private electionRepository: IElectionRepository) {
    super();
  }

  public async execute(isActive: boolean): Promise<IElection[]> {
    try {
      return await this.electionRepository.findAll(isActive);
    } catch (error) {
      this.handleError(error);
    }
  }
}
