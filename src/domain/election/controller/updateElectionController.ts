import { IHttpContext } from '../../util/adapters/httpContext';
import { ErrorHandlerControllers } from '../../util/errors/handlerError';
import { IElection } from '../models/election';
import { IUpdateElectionService } from '../services/updateElectionService';

export interface IUpdateElectionController {
  execute(httpContext: IHttpContext): Promise<void>;
}

export class UpdateElectionController extends ErrorHandlerControllers implements IUpdateElectionController {
  constructor(private updateElectionService: IUpdateElectionService) {
    super();
  }

  public async execute(httpContext: IHttpContext): Promise<void> {
    try {
      const body = httpContext.getRequest().body as IElection;
      const userUpdateData = {
        id: body.id ?? '',
        title: body.title ?? '',
        description: body.description ?? '',
        isDeleted: body.isDeleted ?? ''
      };
      const result = await this.updateElectionService.execute(userUpdateData);
      httpContext.send({ statusCode: 200, body: result });
    } catch (error) {
      httpContext.send(this.handleClientErrors(error));
    }
  }
}


