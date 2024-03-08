import { FindPositionByIdController } from "../../../../../domain/position/controller/findPositionByIdController";
import { FindPositionByIdService } from "../../../../../domain/position/services/findPositionByIdService";
import { PositionRepositoryPrisma } from "../../../../infrastructure/prismaOrm/repositoriesImpl/positionRepositoryPrisma";

export function findPositionByIdFactory() {
  const positionRepository = new PositionRepositoryPrisma();
  const findPositionById = new FindPositionByIdService(positionRepository);
  return new FindPositionByIdController(findPositionById);
}