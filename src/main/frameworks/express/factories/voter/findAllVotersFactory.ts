import { FindAllVotersController } from "../../../../../domain/voter/controllers/findAllVotersController";
import { FindAllVotersService } from "../../../../../domain/voter/services/findAllVotersService";
import { VoterRepositoryPrisma } from "../../../../infrastructure/prismaOrm/repositoriesImpl/voterRepositoryPrisma";

export function findAllVotersFactory() {

  const voterRepository = new VoterRepositoryPrisma();
  const voterService = new FindAllVotersService(voterRepository);
  return new FindAllVotersController(voterService);
}