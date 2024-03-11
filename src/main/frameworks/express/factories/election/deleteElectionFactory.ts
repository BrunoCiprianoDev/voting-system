import { ElectionRepositoryPrisma } from '../../../../infrastructure/prismaOrm/repositoriesImpl/electionRepositoryPrisma';
import { DeleteElectionController } from '../../../../../domain/election/controller/deleteElectionController';
import { deleteElectionService } from '../../../../../domain/election/services/deleteElectionService';

export function deleteElectionFactory() {
  const electionRepository = new ElectionRepositoryPrisma();
  const deleteElection = new deleteElectionService(electionRepository);
  return new DeleteElectionController(deleteElection);
}
