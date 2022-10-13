import { Router } from 'express';
import usersResources from '../app/resources/UsersResources';
import sessionsResources from '../app/resources/SessionsResources';
const router = Router();

router.get('/users', usersResources.get);

router.post('/users', usersResources.store);

router.post('/sessions', sessionsResources.store);

export default router;
