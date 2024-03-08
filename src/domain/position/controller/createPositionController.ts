import { IHttpContext } from '../../util/adapters/httpContext';
import { ErrorHandlerControllers } from '../../util/errors/handlerError';
import { ICreatePositionService } from '../services/createPositionService';

export interface ICreatePositionController {
  execute(httpContext: IHttpContext): Promise<void>;
}

export class CreatePositionController extends ErrorHandlerControllers implements ICreatePositionController {
  constructor(private createPositionService: ICreatePositionService) {
    super();
  }

  public async execute(httpContext: IHttpContext): Promise<void> {
    try {
      const body = httpContext.getRequest().body as { name: string, description: string };
      const userCreateData = {
        name: body.name ?? '',
        description: body.description ?? '',
      };
      const result = await this.createPositionService.execute(userCreateData);
      httpContext.send({ statusCode: 201, body: result });
    } catch (error) {
      httpContext.send(this.handleClientErrors(error));
    }
  }
}

