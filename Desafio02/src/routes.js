import { Router } from 'express';

import SessionController from './app/controllers/SessionController';
import RecipientController from './app/controllers/RecipientController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);

routes.get('/recipients', RecipientController.index);
routes.get('/recipients/:id', RecipientController.show);
routes.get('/recipient', RecipientController.showname);
routes.post('/recipients', RecipientController.store);
routes.put('/recipients', RecipientController.update);
routes.delete('/recipients/:id', RecipientController.delete);
routes.delete('/recipient', RecipientController.deleteName);

export default routes;
