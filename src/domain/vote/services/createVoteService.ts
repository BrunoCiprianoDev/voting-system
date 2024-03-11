import { ITokenGenerator } from "../../util/adapters/tokenGenerator";
import { IuuidGenerator } from "../../util/adapters/uuidGenerator";
import { NotFoundError } from "../../util/errors/appErrors";
import { ErrorHandlerServices } from "../../util/errors/handlerError";
import { IVoterRepository } from "../../voter/repository/voterRepository";
import { IVoteCreateDataWithToken } from "../models/vote";
import { IVoteRepository } from "../repository/voteRepository";

export const ERROR_MESSAGE_NOT_FOUND_VOTER = 'Eleitor não encontrado';

export interface ICreateVoteService {
  execute(votes: IVoteCreateDataWithToken): Promise<void>
}

export class CreateVoteService extends ErrorHandlerServices implements ICreateVoteService {

  constructor(
    private uuidGenerator: IuuidGenerator,
    private tokenGenerator: ITokenGenerator,
    private voteRepository: IVoteRepository,
    private voterRepository: IVoterRepository) {
    super();
  }

  public async execute(data: IVoteCreateDataWithToken): Promise<void> {
    try {
      const voterId = await this.tokenGenerator.getPayloadVoterToken(data.token);
      const voter = await this.voterRepository.findById(voterId);
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