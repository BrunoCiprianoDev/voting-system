import { DeleteCandidateController } from "../../../../../domain/candidate/controllers/deleteCandidateController";
import { DeleteCandidateService } from "../../../../../domain/candidate/services/deleteCandidateService";
import { CandidateRepositoryPrisma } from "../../../../infrastructure/prismaOrm/repositoriesImpl/candidateRepositoryPrisma";

export function deleteCandidateFactory() {
  const candidateRepository = new CandidateRepositoryPrisma();
  const deleteCandidateService = new DeleteCandidateService(
    candidateRepository,
  );
  return new DeleteCandidateController(deleteCandidateService);

}