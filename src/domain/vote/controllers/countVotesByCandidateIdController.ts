import { IHttpContext } from "../../util/adapters/httpContext";
import { ErrorHandlerControllers } from "../../util/errors/handlerError";
import { ICountVotesByCandidateIdService } from "../services/countVotesByCandidateIdService";

export interface ICountVotesByCandidateIdController {
  execute(httpContext: IHttpContext): Promise<void>;
}

export class GetVotesByCandidateIdController extends ErrorHandlerControllers implements ICountVotesByCandidateIdController {
  constructor(private countVotesByCandidateIdService: ICountVotesByCandidateIdService) {
    super();
  }

  public async execute(httpContext: IHttpContext): Promise<void> {
    try {
      const { id } = httpContext.getRequest().query as { id: string };

      const result = await this.countVotesByCandidateIdService.execute(id);

      httpContext.send({ statusCode: 200, body: result });
    } catch (error) {
      httpContext.send(this.handleClientErrors(error));
    }
  }
}
