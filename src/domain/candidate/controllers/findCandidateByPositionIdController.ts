import { IHttpContext } from '../../util/adapters/httpContext';
import { ErrorHandlerControllers } from '../../util/errors/handlerError';
import { IFindCandidateByPositionIdService } from '../services/findCandidateByPositionIdService';

export interface IFindCandidateByPositionIdController {
  execute(httpContext: IHttpContext): Promise<void>;
}

export class FindCandidateByPositionIdController
  extends ErrorHandlerControllers
  implements IFindCandidateByPositionIdController
{
  constructor(private FindCandidateByPositionIdService: IFindCandidateByPositionIdService) {
    super();
  }

  public async execute(httpContext: IHttpContext): Promise<void> {
    try {
      const query = (httpContext.getRequest().query as { positionId: string }) ?? null;
      const positionId = query?.positionId ?? '';
      const result = await this.FindCandidateByPositionIdService.execute(positionId);
      httpContext.send({ statusCode: 200, body: result });
    } catch (error) {
      httpContext.send(this.handleClientErrors(error));
    }
  }
}
