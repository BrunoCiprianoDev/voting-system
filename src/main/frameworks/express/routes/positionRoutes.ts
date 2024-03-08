import { Router } from "express";
import { createPositionFactory } from "../factories/position/createPositionFactory";
import { ExpressHttpContext } from "../../../../shared/expressHttpContext";
import { Request, Response } from 'express';
import { updatePositionFactory } from "../factories/position/updatePositionFactory";
import { findAllPositionFactory } from "../factories/position/findAllPositionFactory";
import { findPositionByIdFactory } from "../factories/position/findPostionByIdFactory";
import { deletePositionFactory } from "../factories/position/deletePositionFactory";

export const positionRouter = Router();

positionRouter.post('/', (request: Request, response: Response) => {
  createPositionFactory().execute(new ExpressHttpContext(request, response));
});

positionRouter.put('/', (request: Request, response: Response) => {
  updatePositionFactory().execute(new ExpressHttpContext(request, response));
});
positionRouter.get('/findById/', (request: Request, response: Response) => {
  findPositionByIdFactory().execute(new ExpressHttpContext(request, response));
});
positionRouter.get('/findAll', (request: Request, response: Response) => {
  findAllPositionFactory().execute(new ExpressHttpContext(request, response));
});
positionRouter.delete('/', (request: Request, response: Response) => {
  deletePositionFactory().execute(new ExpressHttpContext(request, response));
});


