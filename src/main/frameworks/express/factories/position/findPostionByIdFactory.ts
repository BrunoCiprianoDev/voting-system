import { FindPositionByIdController } from "../../../../../domain/position/controller/findPositionByIdController";
import { FindPositionByIdService } from "../../../../../domain/position/services/findPositionByIdService";
import { PositionRepository } from "../../../../infrastructure/prismaOrm/repositoriesImpl/positionRepositoryPrisma";

export function findPositionByIdFactory() {
  const positionRepository = new PositionRepository();
  const findPositionById = new FindPositionByIdService(positionRepository);
  return new FindPositionByIdController(findPositionById);
}