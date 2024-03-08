import { DeletePositionController } from "../../../../../domain/position/controller/deletePositionController";
import { deletePositionService } from "../../../../../domain/position/services/deletePositionService";
import { PositionRepository } from "../../../../infrastructure/prismaOrm/repositoriesImpl/positionRepositoryPrisma";

export function deletePositionFactory() {
  const positionRepository = new PositionRepository();
  const deletePosition = new deletePositionService(positionRepository);
  return new DeletePositionController(deletePosition);
}