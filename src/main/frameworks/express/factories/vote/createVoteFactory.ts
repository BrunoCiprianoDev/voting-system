import { CreateVoteController } from "../../../../../domain/vote/controllers/createVoteController";
import { CreateVoteService } from "../../../../../domain/vote/services/createVoteService";
import { TokenGenerator } from "../../../../../shared/tokenGenerator";
import { UuidGenerator } from "../../../../../shared/uuidGenerator";
import { VoteRepositoryPrisma } from "../../../../infrastructure/prismaOrm/repositoriesImpl/voteRepository";
import { VoterRepositoryPrisma } from "../../../../infrastructure/prismaOrm/repositoriesImpl/voterRepositoryPrisma";

export function createVoteFactory() {
  const uuidGenerator = new UuidGenerator();
  const tokenGenerator = new TokenGenerator();
  const voteRepository = new VoteRepositoryPrisma();
  const voterRepository = new VoterRepositoryPrisma();
  const voteService = new CreateVoteService(
    uuidGenerator,
    tokenGenerator,
    voteRepository,
    voterRepository
  );
  return new CreateVoteController(voteService);
}
