import { IElectionRepository } from '../../election/repository/electionRepository';
import { IuuidGenerator } from '../../util/adapters/uuidGenerator';
import { NotFoundError } from '../../util/errors/appErrors';
import { ErrorHandlerServices } from '../../util/errors/handlerError';
import { IListVoters, IVoterCreateData } from '../model/voter';
import { IVoterRepository } from '../repository/voterRepository';

export const ERROR_MSG_ELECTION_ID_NOT_FOUND = 'O id da eleição informado não é válido.';

export interface ICreateVotersService {
  execute(data: IVoterCreateData): Promise<IListVoters[]>;
}

export class CreateVotersService extends ErrorHandlerServices implements ICreateVotersService {
  constructor(
    private uuidGenerator: IuuidGenerator,
    private electionRepository: IElectionRepository,
    private voterRepository: IVoterRepository,
  ) {
    super();
  }

  public async execute(data: IVoterCreateData): Promise<IListVoters[]> {
    try {
      const electionIsExists = await this.electionRepository.findById(data.electionId);
      if (!electionIsExists) {
        throw new NotFoundError(ERROR_MSG_ELECTION_ID_NOT_FOUND);
      }
      const voters = await Promise.all(
        data.voters.map(async (voter: { registration: string; name: string }) => {
          const id = await this.uuidGenerator.generate();
          return {
            id,
            ...voter,
            electionId: data.electionId,
            email: '',
          };
        }),
      );
      await this.voterRepository.create(voters);
      return voters;
    } catch (error) {
      this.handleError(error);
    }
  }
}
