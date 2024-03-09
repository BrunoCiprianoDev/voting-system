import { IPosition } from "../../position/models/position";

export interface ICandidate {
  id: string,
  name: string,
  position: IPosition,
}

export interface ICandidateCreateData {
  name: string,
  positionId: string,
}


export interface ICandidateUpdateData {
  id: string,
  name: string,
  positionId: string,
}