import { FindVoterByIdController } from "../../../../../domain/voter/controllers/findVoterByIdController";
import { FindVoterByIdService } from "../../../../../domain/voter/services/findVoterByIdService";
import { VoterRepositoryPrisma } from "../../../../infrastructure/prismaOrm/repositoriesImpl/voterRepositoryPrisma";

export function findVoterByIdFactory() {
  const voterRepository = new VoterRepositoryPrisma();
  const findVoterByIdService = new FindVoterByIdService(voterRepository);
  return new FindVoterByIdController(findVoterByIdService);
}