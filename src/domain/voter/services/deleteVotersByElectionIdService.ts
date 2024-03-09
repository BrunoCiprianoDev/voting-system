import { ErrorHandlerServices } from "../../util/errors/handlerError";
import { IVoterRepository } from "../repository/voterRepository";

export interface IDeleteVotersByElectionIdService {
  execute(electionId: string): Promise<void>
}

export class DeleteVotersByElectionIdService extends ErrorHandlerServices implements IDeleteVotersByElectionIdService {

  constructor(private voterRepository: IVoterRepository) {
    super();
  }

  public async execute(electionId: string): Promise<void> {
    try {
      await this.voterRepository.deleteByElectionId(electionId);
    } catch (error) {
      this.handleError(error);
    }
  }

}