import { CreatePositionController } from "../../../../../domain/position/controller/createPositionController";
import { CreatePositionService } from "../../../../../domain/position/services/createPositionService";
import { UuidGenerator } from "../../../../../shared/uuidGenerator";
import { PositionRepository } from "../../../../infrastructure/prismaOrm/repositoriesImpl/positionRepositoryPrisma";

export function createPositionFactory() {
  const uuidGenerator = new UuidGenerator();
  const positionRepository = new PositionRepository();
  const createPositionService = new CreatePositionService(positionRepository, uuidGenerator);
  return new CreatePositionController(createPositionService);
}