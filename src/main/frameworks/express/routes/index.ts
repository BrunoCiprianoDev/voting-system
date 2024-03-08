import { Router } from 'express';
import { userRoutes } from './userRoutes';
import { positionRouter } from './positionRoutes';
import { electionRouter } from './electionRoutes';

const routes = Router();

routes.use('/users', userRoutes);
routes.use('/positions', positionRouter);
routes.use('/elections', electionRouter);

export default routes;
