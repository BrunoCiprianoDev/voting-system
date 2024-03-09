import { IHttpContext } from '../../util/adapters/httpContext';
import { ErrorHandlerControllers } from '../../util/errors/handlerError';
import { IVoterCreateData } from '../model/voter';
import { ICreateVotersService } from '../services/createVotersService';

export interface ICreateVotersController {
  execute(httpContext: IHttpContext): Promise<void>;
}

export class CreateVotersController extends ErrorHandlerControllers implements ICreateVotersController {
  constructor(private createVoterService: ICreateVotersService) {
    super();
  }

  public async execute(httpContext: IHttpContext): Promise<void> {
    try {
      const data = httpContext.getRequest().body as IVoterCreateData;
      const result = await this.createVoterService.execute(data);
      httpContext.send({ statusCode: 201, body: result });
    } catch (error) {
      httpContext.send(this.handleClientErrors(error));
    }
  }
}
