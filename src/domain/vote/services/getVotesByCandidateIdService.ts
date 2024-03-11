import { ErrorHandlerServices } from "../../util/errors/handlerError";
import { IVote } from "../models/vote";
import { IVoteRepository } from "../repository/voteRepository";

export interface IGetVotesByCandidateIdService {
  execute(voterId: string): Promise<IVote[]>
}

export class GetVotesByCandidateIdService extends ErrorHandlerServices implements IGetVotesByCandidateIdService {

  constructor(private voteRepository: IVoteRepository) {
    super();
  }

  public async execute(voterId: string): Promise<IVote[]> {
    try {
      return await this.voteRepository.getVotesByCandidateId(voterId);
    } catch (error) {
      this.handleError(error);
    }
  }

}