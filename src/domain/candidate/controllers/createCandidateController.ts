import { IHttpContext } from '../../util/adapters/httpContext';
import { ErrorHandlerControllers } from '../../util/errors/handlerError';
import { ICandidateCreateData } from '../models/candidate';
import { ICreateCandidateService } from '../services/createCandidateService';

export interface ICreateCandidateController {
  execute(httpContext: IHttpContext): Promise<void>;
}

export class CreateCandidateController extends ErrorHandlerControllers implements ICreateCandidateController {
  constructor(private createCandidateService: ICreateCandidateService) {
    super();
  }

  public async execute(httpContext: IHttpContext): Promise<void> {
    try {
      const body = httpContext.getRequest().body as ICandidateCreateData;
      const candidateCreateData = {
        name: body.name ?? '',
        positionId: body.positionId ?? ''
      };
      const result = await this.createCandidateService.execute(candidateCreateData);
      httpContext.send({ statusCode: 201, body: result });
    } catch (error) {
      httpContext.send(this.handleClientErrors(error));
    }
  }
}

