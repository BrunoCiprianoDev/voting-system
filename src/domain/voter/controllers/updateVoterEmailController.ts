import { IHttpContext } from '../../util/adapters/httpContext';
import { ErrorHandlerControllers } from '../../util/errors/handlerError';
import { IUpdateVoterEmailService } from '../services/updateVoterEmailService';

export interface IUpdateVoterEmailController {
  execute(httpContext: IHttpContext): Promise<void>;
}

export class UpdateVoterEmailController extends ErrorHandlerControllers implements IUpdateVoterEmailController {

  constructor(private updateVoterEmailService: IUpdateVoterEmailService) {
    super();
  }

  public async execute(httpContext: IHttpContext): Promise<void> {
    try {
      const data = httpContext.getRequest().body as { id: string, email: string } || null;
      const result = await this.updateVoterEmailService.execute(data);
      httpContext.send({ statusCode: 200, body: result });
    } catch (error) {
      httpContext.send(this.handleClientErrors(error));
    }
  }
}
