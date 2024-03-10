import { IuuidGenerator } from "../../util/adapters/uuidGenerator";
import { NotFoundError } from "../../util/errors/appErrors";
import { ErrorHandlerServices } from "../../util/errors/handlerError";
import { IVoterRepository } from "../../voter/repository/voterRepository";
import { IVoteCreateData } from "../models/vote";
import { IVoteRepository } from "../repository/voteRepository";

export const ERROR_MESSAGE_NOT_FOUND_VOTER = 'Eleitor não encontrado pelo id';

export interface ICreateVoteService {
  execute(votes: IVoteCreateData): Promise<void>
}

export class CreateVoteService extends ErrorHandlerServices implements ICreateVoteService {

  constructor(
    private uuidGenerator: IuuidGenerator,
    private voteRepository: IVoteRepository,
    private voterRepository: IVoterRepository) {
    super();
  }

  public async execute(data: IVoteCreateData): Promise<void> {
    try {
      const voter = await this.voterRepository.findById(data.voterId);
      if (!voter) {
        throw new NotFoundError(ERROR_MESSAGE_NOT_FOUND_VOTER);
      }
      const votes = await Promise.all(
        data.candidatesId.map(async (candidateId: string) => {
          const id = await this.uuidGenerator.generate();
          return {
            id,
            voter,
            candidateId
          }
        })
      )
      await this.voteRepository.create(votes);
    } catch (error) {
      this.handleError(error);
    }
  }

}