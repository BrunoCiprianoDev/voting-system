import { IHttpContext } from '../../util/adapters/httpContext';
import { ErrorHandlerControllers } from '../../util/errors/handlerError';
import { IPosition } from '../models/position';
import { IUpdatePositionService } from '../services/updatePositionService';

export interface IUpdatePositionController {
  execute(httpContext: IHttpContext): Promise<void>;
}

export class UpdatePositionController extends ErrorHandlerControllers implements IUpdatePositionController {
  constructor(private updatePositionService: IUpdatePositionService) {
    super();
  }

  public async execute(httpContext: IHttpContext): Promise<void> {
    try {
      const body = httpContext.getRequest().body as IPosition;
      const userUpdateData = {
        id: body.id ?? '',
        name: body.name ?? '',
        description: body.description ?? '',
      };
      const result = await this.updatePositionService.execute(userUpdateData);
      httpContext.send({ statusCode: 200, body: result });
    } catch (error) {
      httpContext.send(this.handleClientErrors(error));
    }
  }
}


