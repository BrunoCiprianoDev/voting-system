import { IHttpContext } from '../../util/adapters/httpContext';
import { ErrorHandlerControllers } from '../../util/errors/handlerError';
import { IFindAllCandidatesService } from '../services/findAllCandidateService';

export interface IFindAllCandidatesController {
  execute(httpContext: IHttpContext): Promise<void>;
}

export class FindAllCandidatesController extends ErrorHandlerControllers implements IFindAllCandidatesController {
  constructor(private findAllCandidatesService: IFindAllCandidatesService) {
    super();
  }

  public async execute(httpContext: IHttpContext): Promise<void> {
    try {
      const query = httpContext.getRequest().query as { page: number, size: number, contains: string } ?? null;
      const data = {
        page: query?.page ?? 1,
        size: query?.size ?? 5,
        contains: query?.contains ?? '',
      };
      const result = await this.findAllCandidatesService.execute(data);
      httpContext.send({ statusCode: 200, body: result });
    } catch (error) {
      httpContext.send(this.handleClientErrors(error));
    }
  }
}
