import { IHttpContext } from "../../util/adapters/httpContext";
import { ErrorHandlerControllers } from "../../util/errors/handlerError";
import { CountTotalVotesService } from "../services/countTotalVotes";

export interface ICountTotalVotesController {
  execute(httpContext: IHttpContext): Promise<void>;
}

export class CountTotalVotesController extends ErrorHandlerControllers implements ICountTotalVotesController {
  constructor(private countTotalVotes: CountTotalVotesService) {
    super();
  }

  public async execute(httpContext: IHttpContext): Promise<void> {
    try {

      const result = await this.countTotalVotes.execute();

      httpContext.send({ statusCode: 200, body: result });
    } catch (error) {
      httpContext.send(this.handleClientErrors(error));
    }
  }
}
