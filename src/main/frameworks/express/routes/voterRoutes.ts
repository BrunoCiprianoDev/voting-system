import { Router } from 'express';
import { authAdminMiddleware } from '../middlewares/authAdminMiddleware';
import { ExpressHttpContext } from '../../../../shared/expressHttpContext';
import { createVoterFactory } from '../factories/voter/createVoterFactory';
import { Request, Response } from 'express';
import { findAllVotersFactory } from '../factories/voter/findAllVotersFactory';
import { updateVoterEmailFactory } from '../factories/voter/updateVoterEmailControllerFactory';
import { findVoterByIdFactory } from '../factories/voter/findVoterByIdFactory';
import { findVoterByRegistrationFactory } from '../factories/voter/findVoterByRegistrationFactory';
import { deleteVotersByElectionIdFactory } from '../factories/voter/deleteVotersByElectionIdFactory';

export const voterRoutes = Router();

voterRoutes.post('/', authAdminMiddleware, (request: Request, response: Response) => {
  createVoterFactory().execute(new ExpressHttpContext(request, response));
});
voterRoutes.get('/findAll', authAdminMiddleware, (request: Request, response: Response) => {
  findAllVotersFactory().execute(new ExpressHttpContext(request, response));
});
voterRoutes.patch('/updateEmail', (request: Request, response: Response) => {
  updateVoterEmailFactory().execute(new ExpressHttpContext(request, response));
});
voterRoutes.get('/findById', authAdminMiddleware, (request: Request, response: Response) => {
  findVoterByIdFactory().execute(new ExpressHttpContext(request, response));
});
voterRoutes.get('/findByRegistration', (request: Request, response: Response) => {
  findVoterByRegistrationFactory().execute(new ExpressHttpContext(request, response));
});
voterRoutes.delete('/', authAdminMiddleware, (request: Request, response: Response) => {
  deleteVotersByElectionIdFactory().execute(new ExpressHttpContext(request, response));
});
