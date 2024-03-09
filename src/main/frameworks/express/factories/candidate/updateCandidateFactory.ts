import { UpdateCandidateController } from "../../../../../domain/candidate/controllers/updateCandidateController";
import { UpdateCandidateService } from "../../../../../domain/candidate/services/updateCandidateService";
import { CandidateRepositoryPrisma } from "../../../../infrastructure/prismaOrm/repositoriesImpl/candidateRepositoryPrisma";
import { PositionRepositoryPrisma } from "../../../../infrastructure/prismaOrm/repositoriesImpl/positionRepositoryPrisma";

export function updateCandidateFactory() {
  const candidateRepository = new CandidateRepositoryPrisma();
  const positionRepository = new PositionRepositoryPrisma();
  const updateCandidateService = new UpdateCandidateService(
    candidateRepository,
    positionRepository
  );
  return new UpdateCandidateController(updateCandidateService);

}