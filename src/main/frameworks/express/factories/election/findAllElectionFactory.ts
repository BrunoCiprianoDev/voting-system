import { FindAllElectionsController } from '../../../../../domain/election/controller/findAllElectionsController';
import { FindAllElectionsService } from '../../../../../domain/election/services/findAllElectionsService';
import { ElectionRepositoryPrisma } from '../../../../infrastructure/prismaOrm/repositoriesImpl/electionRepositoryPrisma';

export function findAllElectionFactory() {
  const electionRepository = new ElectionRepositoryPrisma();
  const findAllElectionsService = new FindAllElectionsService(electionRepository);
  return new FindAllElectionsController(findAllElectionsService);
}
