import { ErrorHandlerServices } from "../../util/errors/handlerError";
import { IVoteRepository } from "../repository/voteRepository";

export interface ICountVotesByCandidateIdService {
  execute(candidateId: string): Promise<number>
}

export class CountVotesByCandidateIdService extends ErrorHandlerServices implements ICountVotesByCandidateIdService {

  constructor(private voteRepository: IVoteRepository) {
    super();
  }

  public async execute(candidateId: string): Promise<number> {
    try {
      return await this.voteRepository.countVotesByCandidateId(candidateId);
    } catch (error) {
      this.handleError(error);
    }
  }

}