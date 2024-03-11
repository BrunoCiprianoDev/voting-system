import { GetVotesByVoterIdController } from "../../../../../domain/vote/controllers/getVotesByVoterIdController";
import { GetVotesByVoterIdService } from "../../../../../domain/vote/services/getVotesByVoterIdService";
import { VoteRepositoryPrisma } from "../../../../infrastructure/prismaOrm/repositoriesImpl/voteRepository";

export function getVotesByVoterIdFactory() {
  const voteRepository = new VoteRepositoryPrisma();
  const voteService = new GetVotesByVoterIdService(voteRepository);
  return new GetVotesByVoterIdController(voteService);

}