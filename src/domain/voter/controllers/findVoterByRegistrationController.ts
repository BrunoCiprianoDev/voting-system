import { IHttpContext } from '../../util/adapters/httpContext';
import { ErrorHandlerControllers } from '../../util/errors/handlerError';
import { IFindVoterByRegistrationService } from '../services/findVoterByRegistrationService';

export interface IFindVoterByRegistrationController {
  execute(httpContext: IHttpContext): Promise<void>;
}

export class FindVoterByRegistrationController extends ErrorHandlerControllers implements IFindVoterByRegistrationController {
  constructor(private findVoterByRegistrationService: IFindVoterByRegistrationService) {
    super();
  }

  public async execute(httpContext: IHttpContext): Promise<void> {
    try {
      const { registration } = httpContext.getRequest().query as { registration: string };

      const result = await this.findVoterByRegistrationService.execute(registration);

      httpContext.send({ statusCode: 200, body: result });
    } catch (error) {
      httpContext.send(this.handleClientErrors(error));
    }
  }
}


