import { FindCandidateByPositionIdController } from '../../../../../domain/candidate/controllers/findCandidateByPositionIdController';
import { FindCandidateByPositionIdService } from '../../../../../domain/candidate/services/findCandidateByPositionIdService';
import { CandidateRepositoryPrisma } from '../../../../infrastructure/prismaOrm/repositoriesImpl/candidateRepositoryPrisma';

export function findCandidateByPositionIdFactory() {
  const candidateRepository = new CandidateRepositoryPrisma();
  const findCandidateByPositionIdService = new FindCandidateByPositionIdService(candidateRepository);
  return new FindCandidateByPositionIdController(findCandidateByPositionIdService);
}
