import { IHttpContext } from '../../util/adapters/httpContext';
import { ErrorHandlerControllers } from '../../util/errors/handlerError';
import { IGetTokenVoterService } from '../services/getTokenVoterEmailService';

export interface IGetTokenVoterController {
  execute(httpContext: IHttpContext): Promise<void>;
}

export class GetTokenVoterController
  extends ErrorHandlerControllers
  implements IGetTokenVoterController {
  constructor(private getTokenVoterService: IGetTokenVoterService) {
    super();
  }

  public async execute(httpContext: IHttpContext): Promise<void> {
    try {
      const { email } = httpContext.getRequest().query as { email: string };

      await this.getTokenVoterService.execute(email);

      httpContext.send({ statusCode: 204, body: {} });
    } catch (error) {
      httpContext.send(this.handleClientErrors(error));
    }
  }
}
