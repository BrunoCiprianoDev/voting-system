import { IHttpContext } from '../../util/adapters/httpContext';
import { ErrorHandlerControllers } from '../../util/errors/handlerError';
import { IFindAllVotersService } from '../services/findAllVotersService';

export interface IFindAllVotersController {
  execute(httpContext: IHttpContext): Promise<void>;
}

export class FindAllVotersController extends ErrorHandlerControllers implements IFindAllVotersController {
  constructor(private findAllVotersService: IFindAllVotersService) {
    super();
  }

  public async execute(httpContext: IHttpContext): Promise<void> {
    try {
      const query = (httpContext.getRequest().query as { page: number; size: number; contains: string }) ?? null;
      const data = {
        page: query?.page ?? 1,
        size: query?.size ?? 5,
        contains: query?.contains ?? '',
      };
      const result = await this.findAllVotersService.execute(data);
      httpContext.send({ statusCode: 200, body: result });
    } catch (error) {
      httpContext.send(this.handleClientErrors(error));
    }
  }
}
