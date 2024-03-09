import { CreateCandidateController } from '../../../../../domain/candidate/controllers/createCandidateController';
import { CreateCandidateService } from '../../../../../domain/candidate/services/createCandidateService';
import { UuidGenerator } from '../../../../../shared/uuidGenerator';
import { CandidateRepositoryPrisma } from '../../../../infrastructure/prismaOrm/repositoriesImpl/candidateRepositoryPrisma';
import { PositionRepositoryPrisma } from '../../../../infrastructure/prismaOrm/repositoriesImpl/positionRepositoryPrisma';

export function createCandidateFactory() {
  const uuidGenerator = new UuidGenerator();
  const candidateRepository = new CandidateRepositoryPrisma();
  const positionRepository = new PositionRepositoryPrisma();
  const createCandidateService = new CreateCandidateService(uuidGenerator, candidateRepository, positionRepository);
  return new CreateCandidateController(createCandidateService);
}
