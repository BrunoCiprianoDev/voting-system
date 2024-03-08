import { CreatePositionController } from "../../../../../domain/position/controller/createPositionController";
import { CreatePositionService } from "../../../../../domain/position/services/createPositionService";
import { UuidGenerator } from "../../../../../shared/uuidGenerator";
import { ElectionRepositoryPrisma } from "../../../../infrastructure/prismaOrm/repositoriesImpl/electionRepositoryPrisma";
import { PositionRepositoryPrisma } from "../../../../infrastructure/prismaOrm/repositoriesImpl/positionRepositoryPrisma";

export function createPositionFactory() {
  const uuidGenerator = new UuidGenerator();
  const positionRepository = new PositionRepositoryPrisma();
  const electionRepository = new ElectionRepositoryPrisma();
  const createPositionService = new CreatePositionService(positionRepository, electionRepository, uuidGenerator);
  return new CreatePositionController(createPositionService);
}