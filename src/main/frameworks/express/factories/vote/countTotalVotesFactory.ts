import { CountTotalVotesController } from "../../../../../domain/vote/controllers/countTotalVotes";
import { CountTotalVotesService } from "../../../../../domain/vote/services/countTotalVotes";
import { VoteRepositoryPrisma } from "../../../../infrastructure/prismaOrm/repositoriesImpl/voteRepository";

export function countTotalVotesFactory() {
  const voteRepository = new VoteRepositoryPrisma();
  const countTotalVotesService = new CountTotalVotesService(voteRepository);
  return new CountTotalVotesController(countTotalVotesService);
}