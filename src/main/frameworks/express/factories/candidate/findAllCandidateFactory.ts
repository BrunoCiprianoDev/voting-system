import { FindAllCandidatesController } from '../../../../../domain/candidate/controllers/findAllCandidateController';
import { FindAllCandidatesService } from '../../../../../domain/candidate/services/findAllCandidateService';
import { CandidateRepositoryPrisma } from '../../../../infrastructure/prismaOrm/repositoriesImpl/candidateRepositoryPrisma';

export function findAllCandidateFactory() {
  const candidateRepository = new CandidateRepositoryPrisma();
  const findAllCandidateService = new FindAllCandidatesService(candidateRepository);
  return new FindAllCandidatesController(findAllCandidateService);
}
