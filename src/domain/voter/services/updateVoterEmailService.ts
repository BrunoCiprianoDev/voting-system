import { ErrorHandlerServices } from "../../util/errors/handlerError";
import { IVoter } from "../model/voter";
import { IVoterRepository } from "../repository/voterRepository";
import { NotFoundError } from "../../util/errors/appErrors";

export const ERROR_MSG_NOT_FOUND_VOTER_BY_ID = 'Eleitor não encontrado'

export interface IUpdateVoterEmailService {
  execute(data: { id: string, email: string }): Promise<IVoter>
}

export class UpdateVoterEmailService extends ErrorHandlerServices implements IUpdateVoterEmailService {
  constructor(private voterRepository: IVoterRepository) {
    super()
  }


  public async execute({ id, email }: { id: string, email: string }): Promise<IVoter> {
    try {
      const existsVoter = await this.voterRepository.findById(id);
      if (!existsVoter) {
        throw new NotFoundError(ERROR_MSG_NOT_FOUND_VOTER_BY_ID);
      }
      await this.voterRepository.updateEmail({ id, email });
      return {
        ...existsVoter,
        email
      }
    } catch (error) {
      this.handleError(error);
    }
  }
}