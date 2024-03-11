import { ErrorHandlerServices } from '../../util/errors/handlerError';
import { IVoterRepository } from '../repository/voterRepository';
import { NotFoundError } from '../../util/errors/appErrors';
import { ITokenGenerator } from '../../util/adapters/tokenGenerator';
import { IEmailSender } from '../../util/adapters/emailSender';

export const ERROR_MSG_NOT_FOUND_VOTER_BY_EMAIL = 'Eleitor não encontrado';

export interface IGetTokenVoterService {
  execute(email: string): Promise<void>;
}

export class GetTokenVoterService extends ErrorHandlerServices implements IGetTokenVoterService {
  constructor(
    private voterRepository: IVoterRepository,
    private tokenGenerator: ITokenGenerator,
    private emailSender: IEmailSender
  ) {
    super();
  }

  public async execute(email: string): Promise<void> {
    try {
      const existsVoter = await this.voterRepository.findByEmail(email);
      if (!existsVoter) {
        throw new NotFoundError(ERROR_MSG_NOT_FOUND_VOTER_BY_EMAIL);
      }
      const token = await this.tokenGenerator.getVoterToken(existsVoter.id);
      await this.emailSender.sendTokenForgotPass({ email, token });
    } catch (error) {
      this.handleError(error);
    }
  }
}
