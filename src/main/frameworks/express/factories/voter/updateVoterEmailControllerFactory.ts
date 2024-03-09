import { UpdateVoterEmailController } from "../../../../../domain/voter/controllers/updateVoterEmailController";
import { UpdateVoterEmailService } from "../../../../../domain/voter/services/updateVoterEmailService";
import { VoterRepositoryPrisma } from "../../../../infrastructure/prismaOrm/repositoriesImpl/voterRepositoryPrisma";

export function updateVoterEmailFactory() {
  const voterRepository = new VoterRepositoryPrisma();
  const updateVoterEmailService = new UpdateVoterEmailService(voterRepository);
  return new UpdateVoterEmailController(updateVoterEmailService);
}