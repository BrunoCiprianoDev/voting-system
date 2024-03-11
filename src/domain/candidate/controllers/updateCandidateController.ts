import { IHttpContext } from '../../util/adapters/httpContext';
import { ErrorHandlerControllers } from '../../util/errors/handlerError';
import { ICandidateUpdateData } from '../models/candidate';
import { IUpdateCandidateService } from '../services/updateCandidateService';

export interface IUpdateCandidateController {
  execute(httpContext: IHttpContext): Promise<void>;
}

export class UpdateCandidateController extends ErrorHandlerControllers implements IUpdateCandidateController {
  constructor(private updateCandidateService: IUpdateCandidateService) {
    super();
  }

  public async execute(httpContext: IHttpContext): Promise<void> {
    try {
      const body = httpContext.getRequest().body as ICandidateUpdateData;
      const userUpdateData = {
        id: body.id ?? '',
        name: body.name ?? '',
        positionId: body.positionId ?? '',
      };
      const result = await this.updateCandidateService.execute(userUpdateData);
      httpContext.send({ statusCode: 200, body: result });
    } catch (error) {
      httpContext.send(this.handleClientErrors(error));
    }
  }
}
