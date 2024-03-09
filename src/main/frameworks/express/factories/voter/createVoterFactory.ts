import { CreateVotersController } from "../../../../../domain/voter/controllers/createVotersController";
import { CreateVotersService } from "../../../../../domain/voter/services/createVotersService";
import { UuidGenerator } from "../../../../../shared/uuidGenerator";
import { ElectionRepositoryPrisma } from "../../../../infrastructure/prismaOrm/repositoriesImpl/electionRepositoryPrisma";
import { VoterRepositoryPrisma } from "../../../../infrastructure/prismaOrm/repositoriesImpl/voterRepositoryPrisma";

export function createVoterFactory() {

  const uuidGenerator = new UuidGenerator();
  const voterRepository = new VoterRepositoryPrisma();
  const electionRepository = new ElectionRepositoryPrisma();
  const voterService = new CreateVotersService(uuidGenerator, electionRepository, voterRepository);
  return new CreateVotersController(voterService);
}