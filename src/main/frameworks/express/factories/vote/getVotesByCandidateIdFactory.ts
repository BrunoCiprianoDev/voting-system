import { GetVotesByCandidateIdController } from "../../../../../domain/vote/controllers/getVotesByCandidateIdController";
import { GetVotesByCandidateIdService } from "../../../../../domain/vote/services/getVotesByCandidateIdService";
import { VoteRepositoryPrisma } from "../../../../infrastructure/prismaOrm/repositoriesImpl/voteRepository";

export function getVotesByCandidateIdFactory() {
  const voteRepository = new VoteRepositoryPrisma();
  const voteService = new GetVotesByCandidateIdService(voteRepository);
  return new GetVotesByCandidateIdController(voteService);

}