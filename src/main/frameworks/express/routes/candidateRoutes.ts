import { Request, Response, Router } from 'express';
import { createCandidateFactory } from '../factories/candidate/createCandidateFactory';
import { updateCandidateFactory } from '../factories/candidate/updateCandidateFactory';
import { findCandidateByIdFactory } from '../factories/candidate/findCandidateByIdFactory';
import { findAllCandidateFactory } from '../factories/candidate/findAllCandidateFactory';
import { deleteCandidateFactory } from '../factories/candidate/deleteCandidateFactory';
import { authAdminMiddleware } from '../middlewares/authAdminMiddleware';
import { ExpressHttpContext } from '../../../../shared/expressHttpContext';
import { findCandidateByPositionIdFactory } from '../factories/candidate/findCandidateByPositionIdFactory';

export const candidateRoutes = Router();

candidateRoutes.post('/', authAdminMiddleware, (request: Request, response: Response) => {
  createCandidateFactory().execute(new ExpressHttpContext(request, response));
});
candidateRoutes.put('/', authAdminMiddleware, (request: Request, response: Response) => {
  updateCandidateFactory().execute(new ExpressHttpContext(request, response));
});
candidateRoutes.get('/findById/', (request: Request, response: Response) => {
  findCandidateByIdFactory().execute(new ExpressHttpContext(request, response));
});
candidateRoutes.get('/findAll', (request: Request, response: Response) => {
  findAllCandidateFactory().execute(new ExpressHttpContext(request, response));
});
candidateRoutes.get('/findByPositionId', (request: Request, response: Response) => {
  findCandidateByPositionIdFactory().execute(new ExpressHttpContext(request, response));
});
candidateRoutes.delete('/', authAdminMiddleware, (request: Request, response: Response) => {
  deleteCandidateFactory().execute(new ExpressHttpContext(request, response));
});
