import { IElection } from "../../election/models/election";

export interface IVoter {
  id: string;
  registration: string;
  election: IElection;
  email: string;
}

export interface IVoterCreateData {
  electionId: string;
  voters: [{
    registration: string
    name: string,
  }]
}

export interface IListVoters { id: string, name: string, email: string, registration: string, electionId: string }




