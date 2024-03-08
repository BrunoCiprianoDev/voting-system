import { FindAllPositionsController } from "../../../../../domain/position/controller/findAllPositionsController";
import { FindAllPositionsService } from "../../../../../domain/position/services/findAllPositionsService";
import { PositionRepository } from "../../../../infrastructure/prismaOrm/repositoriesImpl/positionRepositoryPrisma";

export function findAllPositionFactory() {
  const positionRepository = new PositionRepository();
  const findAllPostionsService = new FindAllPositionsService(positionRepository);
  return new FindAllPositionsController(findAllPostionsService);
}