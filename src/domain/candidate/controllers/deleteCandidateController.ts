import { IHttpContext } from '../../util/adapters/httpContext';
import { ErrorHandlerControllers } from '../../util/errors/handlerError';
import { IDeleteCandidateService } from '../services/deleteCandidateService';

export interface IDeleteCandidateController {
  execute(httpContext: IHttpContext): Promise<void>;
}

export class DeleteCandidateController extends ErrorHandlerControllers implements IDeleteCandidateController {
  constructor(private deleteCandidateService: IDeleteCandidateService) {
    super();
  }

  public async execute(httpContext: IHttpContext): Promise<void> {
    try {
      const { id } = httpContext.getRequest().query as { id: string };

      const result = await this.deleteCandidateService.execute(id);

      httpContext.send({ statusCode: 200, body: result });
    } catch (error) {
      httpContext.send(this.handleClientErrors(error));
    }
  }
}


