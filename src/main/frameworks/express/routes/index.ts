import { Router } from 'express';
import { userRoutes } from './userRoutes';
import { positionRouter } from './positionRoutes';

const routes = Router();

routes.use('/users', userRoutes);
routes.use('/positions', positionRouter);

export default routes;
