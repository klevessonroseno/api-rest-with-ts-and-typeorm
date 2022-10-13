import { Router } from 'express';
import usersResources from '../app/resources/UsersResources';
import sessionsResources from '../app/resources/SessionsResources';
import authMiddleware from '../middlewares/auth';

const router = Router();

router.get('/users', authMiddleware, usersResources.get);

router.post('/users', usersResources.store);

router.post('/sessions', sessionsResources.store);

export default router;
