import { IHttpContext } from '../../util/adapters/httpContext';
import { ErrorHandlerControllers } from '../../util/errors/handlerError';
import { IFindAllElectionsService } from '../services/findAllElectionsService';

export interface IFindAllElectionsController {
  execute(httpContext: IHttpContext): Promise<void>;
}

export class FindAllElectionsController extends ErrorHandlerControllers implements IFindAllElectionsController {
  constructor(private findAllElectionsService: IFindAllElectionsService) {
    super();
  }

  public async execute(httpContext: IHttpContext): Promise<void> {
    try {
      const query = httpContext.getRequest().query ?? null;
      const isActive = query?.isActive === 'false' ? false : true;
      const result = await this.findAllElectionsService.execute(isActive);
      httpContext.send({ statusCode: 200, body: result });
    } catch (error) {
      httpContext.send(this.handleClientErrors(error));
    }
  }
}
