import { CountVotesByCandidateIdController } from "../../../../../domain/vote/controllers/countVotesByCandidateIdController";
import { CountVotesByCandidateIdService } from "../../../../../domain/vote/services/countVotesByCandidateIdService";
import { VoteRepositoryPrisma } from "../../../../infrastructure/prismaOrm/repositoriesImpl/voteRepository";

export function countVotesByCandidateIdFactory() {
  const voteRepository = new VoteRepositoryPrisma();
  const countVotesByCandidateIdService = new CountVotesByCandidateIdService(voteRepository);
  return new CountVotesByCandidateIdController(countVotesByCandidateIdService);
}