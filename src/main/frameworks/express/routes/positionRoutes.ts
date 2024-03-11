import { Router } from 'express';
import { createPositionFactory } from '../factories/position/createPositionFactory';
import { ExpressHttpContext } from '../../../../shared/expressHttpContext';
import { Request, Response } from 'express';
import { updatePositionFactory } from '../factories/position/updatePositionFactory';
import { findAllPositionFactory } from '../factories/position/findAllPositionFactory';
import { findPositionByIdFactory } from '../factories/position/findPostionByIdFactory';
import { authAdminMiddleware } from '../middlewares/authAdminMiddleware';

export const positionRouter = Router();

positionRouter.post('/', authAdminMiddleware, (request: Request, response: Response) => {
  createPositionFactory().execute(new ExpressHttpContext(request, response));
});

positionRouter.put('/', authAdminMiddleware, (request: Request, response: Response) => {
  updatePositionFactory().execute(new ExpressHttpContext(request, response));
});
positionRouter.get('/findById/', (request: Request, response: Response) => {
  findPositionByIdFactory().execute(new ExpressHttpContext(request, response));
});
positionRouter.get('/findAll', (request: Request, response: Response) => {
  findAllPositionFactory().execute(new ExpressHttpContext(request, response));
});
positionRouter.delete('/', authAdminMiddleware, (request: Request, response: Response) => {
  findPositionByIdFactory().execute(new ExpressHttpContext(request, response));
});
