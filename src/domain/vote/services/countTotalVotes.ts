import { ErrorHandlerServices } from "../../util/errors/handlerError";
import { IVoteRepository } from "../repository/voteRepository";

export interface ICountTotalVotesService {
  execute(candidateId: string): Promise<number>
}

export class CountTotalVotesService extends ErrorHandlerServices implements ICountTotalVotesService {

  constructor(private voteRepository: IVoteRepository) {
    super();
  }

  public async execute(): Promise<number> {
    try {
      return await this.voteRepository.countTotalVotes();
    } catch (error) {
      this.handleError(error);
    }
  }

}