import { NotFoundError } from '../../util/errors/appErrors';
import { ErrorHandlerServices } from '../../util/errors/handlerError';
import { IElectionRepository } from '../repository/electionRepository';

export const ERROR_MSG_NOT_FOUND_ELECTION_BY_DELETED = 'Id não encontrado';

export interface IDeleteElection {
  execute(id: string): Promise<void>;
}

export class deleteElectionService extends ErrorHandlerServices implements IDeleteElection {
  constructor(private electionRepository: IElectionRepository) {
    super();
  }

  public async execute(id: string): Promise<void> {
    try {
      const isExists = await this.electionRepository.findById(id);
      if (!isExists) {
        throw new NotFoundError(ERROR_MSG_NOT_FOUND_ELECTION_BY_DELETED);
      }
      await this.electionRepository.delete(id);
    } catch (error) {
      this.handleError(error);
    }
  }
}
