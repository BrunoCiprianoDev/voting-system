import { IHttpContext } from '../../util/adapters/httpContext';
import { ErrorHandlerControllers } from '../../util/errors/handlerError';
import { IFindElectionByIdService } from '../services/findElectionByIdService';

export interface IFindElectionByIdController {
  execute(httpContext: IHttpContext): Promise<void>;
}

export class FindElectionByIdController extends ErrorHandlerControllers implements IFindElectionByIdController {
  constructor(private findElectionByIdService: IFindElectionByIdService) {
    super();
  }

  public async execute(httpContext: IHttpContext): Promise<void> {
    try {
      const { id } = httpContext.getRequest().query as { id: string };

      const result = await this.findElectionByIdService.execute(id);

      httpContext.send({ statusCode: 200, body: result });
    } catch (error) {
      httpContext.send(this.handleClientErrors(error));
    }
  }
}


