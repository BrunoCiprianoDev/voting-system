import { IHttpContext } from '../../util/adapters/httpContext';
import { ErrorHandlerControllers } from '../../util/errors/handlerError';
import { IDeleteElection } from '../services/deleteElectionService';

export interface IDeleteElectionController {
  execute(httpContext: IHttpContext): Promise<void>;
}

export class DeleteElectionController extends ErrorHandlerControllers implements IDeleteElectionController {
  constructor(private deleteElectionService: IDeleteElection) {
    super();
  }

  public async execute(httpContext: IHttpContext): Promise<void> {
    try {
      const { id } = httpContext.getRequest().query as { id: string };

      const result = await this.deleteElectionService.execute(id);

      httpContext.send({ statusCode: 200, body: result });
    } catch (error) {
      httpContext.send(this.handleClientErrors(error));
    }
  }
}
