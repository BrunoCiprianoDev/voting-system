import { IHttpContext } from '../../util/adapters/httpContext';
import { ErrorHandlerControllers } from '../../util/errors/handlerError';
import { IDeleteVotersByElectionIdService } from '../services/deleteVotersByElectionIdService';

export interface IDeleteVotersByElectionIdController {
  execute(httpContext: IHttpContext): Promise<void>;
}

export class DeleteVotersByElectionIdController
  extends ErrorHandlerControllers
  implements IDeleteVotersByElectionIdController {
  constructor(private delecteVoterByElectionIdService: IDeleteVotersByElectionIdService) {
    super();
  }

  public async execute(httpContext: IHttpContext): Promise<void> {
    try {
      const { electionId } = httpContext.getRequest().query as { electionId: string };

      const result = await this.delecteVoterByElectionIdService.execute(electionId);

      httpContext.send({ statusCode: 204, body: result });
    } catch (error) {
      httpContext.send(this.handleClientErrors(error));
    }
  }
}
