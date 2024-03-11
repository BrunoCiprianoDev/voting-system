import { IHttpContext } from '../../util/adapters/httpContext';
import { ErrorHandlerControllers } from '../../util/errors/handlerError';
import { IFindPositionByIdService } from '../services/findPositionByIdService';

export interface IFindPositionByIdController {
  execute(httpContext: IHttpContext): Promise<void>;
}

export class FindPositionByIdController extends ErrorHandlerControllers implements IFindPositionByIdController {
  constructor(private findPositionByIdService: IFindPositionByIdService) {
    super();
  }

  public async execute(httpContext: IHttpContext): Promise<void> {
    try {
      const { id } = httpContext.getRequest().query as { id: string };

      const result = await this.findPositionByIdService.execute(id);

      httpContext.send({ statusCode: 200, body: result });
    } catch (error) {
      httpContext.send(this.handleClientErrors(error));
    }
  }
}
