import { FindElectionByIdController } from '../../../../../domain/election/controller/findElectionByIdController';
import { FindElectionByIdService } from '../../../../../domain/election/services/findElectionByIdService';
import { ElectionRepositoryPrisma } from '../../../../infrastructure/prismaOrm/repositoriesImpl/electionRepositoryPrisma';

export function findElectionByIdFactory() {
  const electionRepository = new ElectionRepositoryPrisma();
  const findElectionById = new FindElectionByIdService(electionRepository);
  return new FindElectionByIdController(findElectionById);
}
