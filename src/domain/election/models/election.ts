export interface IElection {
  id: string;
  title: string;
  description: string;
  isActive: boolean;
}

export interface IElectionCreateData extends Omit<IElection, 'id'> {}
