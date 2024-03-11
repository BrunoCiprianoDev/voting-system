import { ITokenGenerator } from "../../util/adapters/tokenGenerator";
import { IuuidGenerator } from "../../util/adapters/uuidGenerator";
import { BadRequestError, NotFoundError } from "../../util/errors/appErrors";
import { ErrorHandlerServices } from "../../util/errors/handlerError";
import { IVoterRepository } from "../../voter/repository/voterRepository";
import { IVoteCreateDataWithToken } from "../models/vote";
import { IVoteRepository } from "../repository/voteRepository";

export const ERROR_MESSAGE_NOT_FOUND_VOTER = 'Eleitor não encontrado';
export const ERROR_MESSAGE_VOTER_ALREADY_VOTED = 'O eleitor informado já tem votos computados anteriormente'

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
      if (voter.alreadyVoted === true) {
        throw new BadRequestError(ERROR_MESSAGE_VOTER_ALREADY_VOTED);
      }
      const votes = await Promise.all(
        data.candidatesId.map(async (candidateId: string) => {
          const id = await this.uuidGenerator.generate();
          return {
            id,
            voterId,
            voter,
            candidateId
          }
        })
      )
      await this.voterRepository.setAlreadyVoteIsTrue(voterId);
      await this.voteRepository.create(votes);
    } catch (error) {
      this.handleError(error);
    }
  }

}