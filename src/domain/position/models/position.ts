import { IElection } from "../../election/models/election";

export interface IPosition {
  id: string;
  name: string;
  description: string;
  election: IElection;
}

export interface IPositionCreateData {
  name: string;
  description: string;
  electionId: string;
}

