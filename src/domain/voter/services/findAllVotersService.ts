import { ErrorHandlerServices } from '../../util/errors/handlerError';
import { IListVoters } from '../model/voter';
import { IVoterRepository } from '../repository/voterRepository';

export interface IFindAllVotersService {
  execute(data: { page: number; size: number; contains: string }): Promise<IListVoters[]>;
}

export class FindAllVotersService extends ErrorHandlerServices implements IFindAllVotersService {
  constructor(private voterRepository: IVoterRepository) {
    super();
  }

  public async execute(data: { page: number; size: number; contains: string }): Promise<IListVoters[]> {
    try {
      return await this.voterRepository.findAll(data);
    } catch (error) {
      this.handleError(error);
    }
  }
}
