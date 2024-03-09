import { Router } from 'express';
import { userRoutes } from './userRoutes';
import { positionRouter } from './positionRoutes';
import { electionRouter } from './electionRoutes';
import { candidateRoutes } from './candidateRoutes';
import { voterRoutes } from './voterRoutes';

const routes = Router();

routes.use('/users', userRoutes);
routes.use('/positions', positionRouter);
routes.use('/elections', electionRouter);
routes.use('/candidates', candidateRoutes);
routes.use('/voters', voterRoutes);

export default routes;
