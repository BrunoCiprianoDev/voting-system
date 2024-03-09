import { IHttpContext } from '../../util/adapters/httpContext';
import { ErrorHandlerControllers } from '../../util/errors/handlerError';
import { IFindVoterByIdService } from '../services/findVoterByIdService';

export interface IFindVoterByIdController {
  execute(httpContext: IHttpContext): Promise<void>;
}

export class FindVoterByIdController extends ErrorHandlerControllers implements IFindVoterByIdController {
  constructor(private findVoterByIdService: IFindVoterByIdService) {
    super();
  }

  public async execute(httpContext: IHttpContext): Promise<void> {
    try {
      const { id } = httpContext.getRequest().query as { id: string };

      const result = await this.findVoterByIdService.execute(id);

      httpContext.send({ statusCode: 200, body: result });
    } catch (error) {
      httpContext.send(this.handleClientErrors(error));
    }
  }
}


