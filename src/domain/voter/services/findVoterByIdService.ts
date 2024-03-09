import { NotFoundError } from "../../util/errors/appErrors";
import { ErrorHandlerServices } from "../../util/errors/handlerError";
import { IVoter } from "../model/voter";
import { IVoterRepository } from "../repository/voterRepository";

export const ERROR_MSG_NOT_FOUND_VOTER_BY_ID = 'Usuário não encontrado pelo ID'

export interface IFindVoterByIdService {
  execute(id: string): Promise<IVoter | null>;
}

export class FindVoterByIdService extends ErrorHandlerServices implements IFindVoterByIdService {

  constructor(private voterRepository: IVoterRepository) {
    super()
  }

  public async execute(id: string): Promise<IVoter | null> {
    try {
      const result = await this.voterRepository.findById(id);
      if (!result) {
        throw new NotFoundError(ERROR_MSG_NOT_FOUND_VOTER_BY_ID);
      }
      return result;
    } catch (error) {
      this.handleError(error);
    }
  }
}