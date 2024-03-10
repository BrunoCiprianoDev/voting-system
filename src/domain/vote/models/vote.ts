import { IVoter } from "../../voter/model/voter";

export interface IVote {
  id: string;
  candidateId: string;
  voter: IVoter;
}

export interface IVoteCreateData {
  voterId: string;
  candidatesId: string[];
}