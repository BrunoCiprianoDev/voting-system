import { DeleteVotersByElectionIdController } from "../../../../../domain/voter/controllers/deleteVotersByElectionIdService";
import { DeleteVotersByElectionIdService } from "../../../../../domain/voter/services/deleteVotersByElectionIdService";
import { VoterRepositoryPrisma } from "../../../../infrastructure/prismaOrm/repositoriesImpl/voterRepositoryPrisma";

export function deleteVotersByElectionIdFactory() {
  const voterRepository = new VoterRepositoryPrisma();
  const deleteVotersByElectionIdService = new DeleteVotersByElectionIdService(voterRepository);
  return new DeleteVotersByElectionIdController(deleteVotersByElectionIdService);
}