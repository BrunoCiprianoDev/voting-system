import { ExpressHttpContext } from '../../../../shared/expressHttpContext';
import { createElectionFactory } from '../factories/election/createElectionFactory';
import { deleteElectionFactory } from '../factories/election/deleteElectionFactory';
import { findAllElectionFactory } from '../factories/election/findAllElectionFactory';
import { findElectionByIdFactory } from '../factories/election/findElectionByIdFactory';
import { updateElectionFactory } from '../factories/election/updateElectionFactory';
import { authAdminMiddleware } from '../middlewares/authAdminMiddleware';
import { Request, Response, Router } from 'express';

export const electionRouter = Router();

electionRouter.post('/', authAdminMiddleware, (request: Request, response: Response) => {
  createElectionFactory().execute(new ExpressHttpContext(request, response));
});

electionRouter.put('/', authAdminMiddleware, (request: Request, response: Response) => {
  updateElectionFactory().execute(new ExpressHttpContext(request, response));
});
electionRouter.get('/findById/', (request: Request, response: Response) => {
  findElectionByIdFactory().execute(new ExpressHttpContext(request, response));
});
electionRouter.get('/findAll', (request: Request, response: Response) => {
  findAllElectionFactory().execute(new ExpressHttpContext(request, response));
});
electionRouter.delete('/', authAdminMiddleware, (request: Request, response: Response) => {
  deleteElectionFactory().execute(new ExpressHttpContext(request, response));
});
