import { Router } from 'express';

import AuthController from './app/controllers/AuthController';
import StudentsController from './app/controllers/StudentsController';

import AuthMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/auth', AuthController.store);

routes.use(AuthMiddleware);

routes.post('/students', StudentsController.store);

routes.put('/students/:id', StudentsController.update);

export default routes;
