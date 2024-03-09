import { Router } from "express";
import { authAdminMiddleware } from "../middlewares/authAdminMiddleware";
import { ExpressHttpContext } from "../../../../shared/expressHttpContext";
import { createVoterFactory } from "../factories/voter/createVoterFactory";
import { Request, Response } from 'express';
import { findAllVotersFactory } from "../factories/voter/findAllVotersFactory";

export const voterRoutes = Router();

voterRoutes.post('/', authAdminMiddleware, (request: Request, response: Response) => {
  createVoterFactory().execute(new ExpressHttpContext(request, response));
});
voterRoutes.get('/findAll', authAdminMiddleware, (request: Request, response: Response) => {
  findAllVotersFactory().execute(new ExpressHttpContext(request, response));
});