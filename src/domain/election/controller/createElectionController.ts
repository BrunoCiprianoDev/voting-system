import { IHttpContext } from '../../util/adapters/httpContext';
import { ErrorHandlerControllers } from '../../util/errors/handlerError';
import { ICreateElectionService } from '../services/createElectionService';

export interface ICreateElectionController {
  execute(httpContext: IHttpContext): Promise<void>;
}

export class CreateElectionController extends ErrorHandlerControllers implements ICreateElectionController {
  constructor(private createElectionService: ICreateElectionService) {
    super();
  }

  public async execute(httpContext: IHttpContext): Promise<void> {
    try {
      const body = httpContext.getRequest().body as { title: string, description: string, electionId: string };
      const electionCreateData = {
        title: body.title ?? '',
        description: body.description ?? '',
        isActive: true
      };
      const result = await this.createElectionService.execute(electionCreateData);
      httpContext.send({ statusCode: 201, body: result });
    } catch (error) {
      httpContext.send(this.handleClientErrors(error));
    }
  }
}

