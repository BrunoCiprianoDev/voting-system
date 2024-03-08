import { IHttpContext } from '../../util/adapters/httpContext';
import { ErrorHandlerControllers } from '../../util/errors/handlerError';
import { IFindAllPositionsService } from '../services/findAllPositionsService';

export interface IFindAllPositionsController {
  execute(httpContext: IHttpContext): Promise<void>;
}

export class FindAllPositionsController extends ErrorHandlerControllers implements IFindAllPositionsController {
  constructor(private findAllPositionsService: IFindAllPositionsService) {
    super();
  }

  public async execute(httpContext: IHttpContext): Promise<void> {
    try {
      const query = httpContext.getRequest().query ?? null;
      const findAllPositionsData = {
        page: query?.page ?? 1,
        size: query?.size ?? 5,
        contains: query?.contains ?? '',
      } as { page: number, size: number, contains: string };
      const result = await this.findAllPositionsService.execute(findAllPositionsData);
      httpContext.send({ statusCode: 200, body: result });
    } catch (error) {
      httpContext.send(this.handleClientErrors(error));
    }
  }
}

