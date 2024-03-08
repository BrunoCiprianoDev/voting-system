import { CreateElectionController } from "../../../../../domain/election/controller/createElectionController";
import { CreateElectionService } from "../../../../../domain/election/services/createElectionService";
import { UuidGenerator } from "../../../../../shared/uuidGenerator";
import { ElectionRepositoryPrisma } from "../../../../infrastructure/prismaOrm/repositoriesImpl/electionRepositoryPrisma";

export function createElectionFactory() {
  const uuidGenerator = new UuidGenerator();
  const electionRepository = new ElectionRepositoryPrisma();
  const createElectionService = new CreateElectionService(electionRepository, uuidGenerator);
  return new CreateElectionController(createElectionService);
}