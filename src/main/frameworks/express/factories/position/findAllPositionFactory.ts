import { FindAllPositionsController } from '../../../../../domain/position/controller/findAllPositionsController';
import { FindAllPositionsService } from '../../../../../domain/position/services/findAllPositionsService';
import { PositionRepositoryPrisma } from '../../../../infrastructure/prismaOrm/repositoriesImpl/positionRepositoryPrisma';

export function findAllPositionFactory() {
  const positionRepository = new PositionRepositoryPrisma();
  const findAllPostionsService = new FindAllPositionsService(positionRepository);
  return new FindAllPositionsController(findAllPostionsService);
}
