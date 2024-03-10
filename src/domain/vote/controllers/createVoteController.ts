import { IHttpContext } from "../../util/adapters/httpContext";
import { ErrorHandlerControllers } from "../../util/errors/handlerError";
import { ICreateVotersController } from "../../voter/controllers/createVotersController";
import { IVoteCreateData } from "../models/vote";
import { ICreateVoteService } from "../services/createVoteService";

export interface ICreateVoteController {
  execute(httpContext: IHttpContext): Promise<void>;
}

export class CreateVoteController extends ErrorHandlerControllers implements ICreateVotersController {
  constructor(private createVoterService: ICreateVoteService) {
    super();
  }

  public async execute(httpContext: IHttpContext): Promise<void> {
    try {
      const data = httpContext.getRequest().body as IVoteCreateData;
      const result = await this.createVoterService.execute(data);
      httpContext.send({ statusCode: 201, body: result });
    } catch (error) {
      httpContext.send(this.handleClientErrors(error));
    }
  }
}
