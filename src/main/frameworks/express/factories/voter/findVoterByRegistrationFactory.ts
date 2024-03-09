import { FindVoterByRegistrationController } from "../../../../../domain/voter/controllers/findVoterByRegistrationController";
import { FindVoterByRegistrationService } from "../../../../../domain/voter/services/findVoterByRegistrationService";
import { VoterRepositoryPrisma } from "../../../../infrastructure/prismaOrm/repositoriesImpl/voterRepositoryPrisma";

export function findVoterByRegistrationFactory() {
  const voterRepository = new VoterRepositoryPrisma();
  const findVoterByRegistrationService = new FindVoterByRegistrationService(voterRepository);
  return new FindVoterByRegistrationController(findVoterByRegistrationService);
}