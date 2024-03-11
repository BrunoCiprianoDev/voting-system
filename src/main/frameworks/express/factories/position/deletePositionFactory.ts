import { DeletePositionController } from '../../../../../domain/position/controller/deletePositionController';
import { deletePositionService } from '../../../../../domain/position/services/deletePositionService';
import { PositionRepositoryPrisma } from '../../../../infrastructure/prismaOrm/repositoriesImpl/positionRepositoryPrisma';

export function deletePositionFactory() {
  const positionRepository = new PositionRepositoryPrisma();
  const deletePosition = new deletePositionService(positionRepository);
  return new DeletePositionController(deletePosition);
}
