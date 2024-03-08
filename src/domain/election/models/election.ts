export interface IElection {
  id: string,
  title: string,
  description: string,
  isDeleted: boolean
}

export interface IElectionCreateData extends Omit<IElection, 'id'> { }