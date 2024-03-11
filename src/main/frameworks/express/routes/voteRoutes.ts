import { Request, Response, Router } from 'express';
import { createVoteFactory } from '../factories/vote/createVoteFactory';
import { ExpressHttpContext } from '../../../../shared/expressHttpContext';
import { getVotesByCandidateIdFactory } from '../factories/vote/getVotesByCandidateIdFactory';
import { getVotesByVoterIdFactory } from '../factories/vote/getVotesByVoterIdService';
import { countTotalVotesFactory } from '../factories/vote/countTotalVotesFactory';
import { countVotesByCandidateIdFactory } from '../factories/vote/countVotesByCandidateIdFactory';

export const voterRoutes = Router();

voterRoutes.post('/', (request: Request, response: Response) => {
  createVoteFactory().execute(new ExpressHttpContext(request, response));
});
voterRoutes.get('/getByCandidateId', (request: Request, response: Response) => {
  getVotesByCandidateIdFactory().execute(new ExpressHttpContext(request, response));
});
voterRoutes.get('/getByVoterId', (request: Request, response: Response) => {
  getVotesByVoterIdFactory().execute(new ExpressHttpContext(request, response));
});
voterRoutes.get('/countTotal', (request: Request, response: Response) => {
  countTotalVotesFactory().execute(new ExpressHttpContext(request, response));
});
voterRoutes.get('/countByCandidateId', (request: Request, response: Response) => {
  countVotesByCandidateIdFactory().execute(new ExpressHttpContext(request, response));
});