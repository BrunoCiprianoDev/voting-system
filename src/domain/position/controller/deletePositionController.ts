import { IHttpContext } from '../../util/adapters/httpContext';
import { ErrorHandlerControllers } from '../../util/errors/handlerError';
import { IDeletePosition } from '../services/deletePositionService';

export interface IDeletePositionController {
  execute(httpContext: IHttpContext): Promise<void>;
}

export class DeletePositionController extends ErrorHandlerControllers implements IDeletePositionController {
  constructor(private deletePositionService: IDeletePosition) {
    super();
  }

  public async execute(httpContext: IHttpContext): Promise<void> {
    try {
      const { id } = httpContext.getRequest().query as { id: string };

      const result = await this.deletePositionService.execute(id);

      httpContext.send({ statusCode: 200, body: result });
    } catch (error) {
      httpContext.send(this.handleClientErrors(error));
    }
  }
}
