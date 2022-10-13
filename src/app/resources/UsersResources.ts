import { Request, Response } from 'express';
import usersRepository from '../repositories/UsersRepository';
import usersServices from '../services/UsersServices';

class UsersResources {
  async get(request: Request, response: Response) {
    const users = await usersRepository.list();

    response.status(200).json({ users });
  }

  async store(request: Request, response: Response) {
    const { name, email, password } = request.body;
    const emailRegistered = await usersRepository.checkIfRegisteredEmail(email);

    if(emailRegistered) {
      return response.status(409).json({
        error: 'Email already registered.',
      });
    }
    const encryptPassword = await usersServices.encryptPassword(password);

    const userSaved = await usersRepository.save(name, email, encryptPassword);
    
    response.status(201).json({ userSaved });
  }
}

export default new UsersResources();
