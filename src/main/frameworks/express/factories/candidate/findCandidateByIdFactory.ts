import { FindCandidateByIdController } from '../../../../../domain/candidate/controllers/findCandidateByIdController';
import { FindCandidateByIdService } from '../../../../../domain/candidate/services/findCandidateByIdService';
import { CandidateRepositoryPrisma } from '../../../../infrastructure/prismaOrm/repositoriesImpl/candidateRepositoryPrisma';

export function findCandidateByIdFactory() {
  const candidateRepository = new CandidateRepositoryPrisma();
  const findCandidateByIdService = new FindCandidateByIdService(candidateRepository);
  return new FindCandidateByIdController(findCandidateByIdService);
}
