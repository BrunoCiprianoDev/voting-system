import { IVoter } from "../../voter/model/voter";

export interface IVote {
  id: string;
  candidateId: string;
  voterId: string;
  voter: IVoter;
}

export interface IVoteCreateData {
  voterId: string;
  candidatesId: string[];
}

export interface IVoteCreateDataWithToken extends Omit<IVoteCreateData, 'voterId'> {
  token: string;
}