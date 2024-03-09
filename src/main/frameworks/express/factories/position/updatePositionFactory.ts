import { UpdatePositionController } from '../../../../../domain/position/controller/updatePositionController';
import { UpdatePositionService } from '../../../../../domain/position/services/updatePositionService';
import { PositionRepositoryPrisma } from '../../../../infrastructure/prismaOrm/repositoriesImpl/positionRepositoryPrisma';

export function updatePositionFactory() {
  const positionRepository = new PositionRepositoryPrisma();
  const updatePositionService = new UpdatePositionService(positionRepository);
  return new UpdatePositionController(updatePositionService);
}
