import { Request, Response } from 'express';
import usersRepository from '../repositories/UsersRepository';

class UsersResources {
  async get(request: Request, response: Response) {
    const users = await usersRepository.list();

    response.status(200).json({ users });
  }

  async store(request: Request, response: Response) {
    const { name, email, office } = request.body;

    const userSaved = await usersRepository.save(name, email, office);

    response.status(201).json({ userSaved });
  }
}

export default new UsersResources();
