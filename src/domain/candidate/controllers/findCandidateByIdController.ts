import { IHttpContext } from '../../util/adapters/httpContext';
import { ErrorHandlerControllers } from '../../util/errors/handlerError';
import { IFindCandidateByIdService } from '../services/findCandidateByIdService';

export interface IFindCandidateByIdController {
  execute(httpContext: IHttpContext): Promise<void>;
}

export class FindCandidateByIdController extends ErrorHandlerControllers implements IFindCandidateByIdController {
  constructor(private findCandidateByIdService: IFindCandidateByIdService) {
    super();
  }

  public async execute(httpContext: IHttpContext): Promise<void> {
    try {
      const { id } = httpContext.getRequest().query as { id: string };

      const result = await this.findCandidateByIdService.execute(id);

      httpContext.send({ statusCode: 200, body: result });
    } catch (error) {
      httpContext.send(this.handleClientErrors(error));
    }
  }
}


