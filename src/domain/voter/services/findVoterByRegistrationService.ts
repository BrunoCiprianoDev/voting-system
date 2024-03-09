import { NotFoundError } from '../../util/errors/appErrors';
import { ErrorHandlerServices } from '../../util/errors/handlerError';
import { IVoter } from '../model/voter';
import { IVoterRepository } from '../repository/voterRepository';

export const ERROR_MSG_NOT_FOUND_VOTER_BY_REGISTRATION = 'Usuário não encontrado pelo ID';

export interface IFindVoterByRegistrationService {
  execute(registration: string): Promise<IVoter | null>;
}

export class FindVoterByRegistrationService extends ErrorHandlerServices implements IFindVoterByRegistrationService {
  constructor(private voterRepository: IVoterRepository) {
    super();
  }

  public async execute(registration: string): Promise<IVoter | null> {
    try {
      const result = await this.voterRepository.findByRegistration(registration);
      if (!result) {
        throw new NotFoundError(ERROR_MSG_NOT_FOUND_VOTER_BY_REGISTRATION);
      }
      return result;
    } catch (error) {
      this.handleError(error);
    }
  }
}
