import { GetTokenVoterController } from "../../../../../domain/voter/controllers/getVoterTokenController";
import { GetTokenVoterService } from "../../../../../domain/voter/services/getTokenVoterEmailService";
import { EmailSender } from "../../../../../shared/emailSender";
import { TokenGenerator } from "../../../../../shared/tokenGenerator";
import { VoterRepositoryPrisma } from "../../../../infrastructure/prismaOrm/repositoriesImpl/voterRepositoryPrisma";

export function getTokenVoterFactory() {
  const tokenGenerator = new TokenGenerator();
  const voterRepository = new VoterRepositoryPrisma();
  const emailSender = new EmailSender();
  const voterService = new GetTokenVoterService(voterRepository, tokenGenerator, emailSender);
  return new GetTokenVoterController(voterService);
}