import { ErrorHandlerServices } from "../../util/errors/handlerError";
import { IVote } from "../models/vote";
import { IVoteRepository } from "../repository/voteRepository";

export interface IGetVotesByVoterIdService {
  execute(voterId: string): Promise<IVote[]>
}

export class GetVotesByVoterIdService extends ErrorHandlerServices implements IGetVotesByVoterIdService {

  constructor(private voteRepository: IVoteRepository) {
    super();
  }

  public async execute(voterId: string): Promise<IVote[]> {
    try {
      return await this.voteRepository.getVotesByVoterId(voterId);
    } catch (error) {
      this.handleError(error);
    }
  }

}