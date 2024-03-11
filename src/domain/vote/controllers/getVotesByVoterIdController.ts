import { IHttpContext } from "../../util/adapters/httpContext";
import { ErrorHandlerControllers } from "../../util/errors/handlerError";
import { GetVotesByVoterIdService } from "../services/getVotesByVoterIdService";

export interface IGetVotesByVoterIdController {
  execute(httpContext: IHttpContext): Promise<void>;
}

export class GetVotesByVoterIdController extends ErrorHandlerControllers implements IGetVotesByVoterIdController {
  constructor(private getVotesByVoterIdService: GetVotesByVoterIdService) {
    super();
  }

  public async execute(httpContext: IHttpContext): Promise<void> {
    try {
      const { id } = httpContext.getRequest().query as { id: string };

      const result = await this.getVotesByVoterIdService.execute(id);

      httpContext.send({ statusCode: 200, body: result });
    } catch (error) {
      httpContext.send(this.handleClientErrors(error));
    }
  }
}
