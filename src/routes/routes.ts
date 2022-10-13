import { Router } from 'express';
import usersResources from '../app/resources/UsersResources';

const router = Router();

router.get('/users', usersResources.get);

router.post('/users', usersResources.store);

export default router;
