import { IHttpContext } from "../../util/adapters/httpContext";
import { ErrorHandlerControllers } from "../../util/errors/handlerError";
import { GetVotesByCandidateIdService } from "../services/getVotesByCandidateIdService";

export interface IGetVotesByCandidateIdController {
  execute(httpContext: IHttpContext): Promise<void>;
}

export class GetVotesByCandidateIdController extends ErrorHandlerControllers implements IGetVotesByCandidateIdController {
  constructor(private getVotesByCandidateIdService: GetVotesByCandidateIdService) {
    super();
  }

  public async execute(httpContext: IHttpContext): Promise<void> {
    try {
      const { id } = httpContext.getRequest().query as { id: string };

      const result = await this.getVotesByCandidateIdService.execute(id);

      httpContext.send({ statusCode: 200, body: result });
    } catch (error) {
      httpContext.send(this.handleClientErrors(error));
    }
  }
}
