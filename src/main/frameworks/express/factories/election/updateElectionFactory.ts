import { UpdateElectionController } from "../../../../../domain/election/controller/updateElectionController";
import { UpdateElecitionService } from "../../../../../domain/election/services/updateElectionService";
import { ElectionRepositoryPrisma } from "../../../../infrastructure/prismaOrm/repositoriesImpl/electionRepositoryPrisma";

export function updateElectionFactory() {
  const electionRepository = new ElectionRepositoryPrisma();
  const updateElectionService = new UpdateElecitionService(electionRepository);
  return new UpdateElectionController(updateElectionService);
}