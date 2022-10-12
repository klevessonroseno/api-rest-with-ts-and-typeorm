import { Router, Request, Response } from 'express';

const router = Router();

router.get('/', (request: Request, response: Response) => {
  response.status(200).json({
    message: 'Tudo Certo.',
  });
});

export default router;