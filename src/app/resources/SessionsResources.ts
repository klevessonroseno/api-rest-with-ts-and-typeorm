import { Request, Response } from 'express';
import usersRepository from '../repositories/UsersRepository';
import * as jwt from 'jsonwebtoken';
import authConfig from '../../config/auth';

class SessionsResources {
  async store(request: Request, response: Response) {
    const { email, password } = request.body;

    const emailRegistered = await usersRepository.checkIfRegisteredEmail(email);

    if(!emailRegistered) return response.status(404).json({ 
      error: 'Email not registered.',
    });

    const user = await usersRepository.findByEmail(email);

    const token = jwt.sign({
      id: user.id,
      name: user.name,
      email: user.email,
    }, 
      authConfig.secret, {
        expiresIn: authConfig.expiresIn,
    });

    return response.status(200).json({ token });
  }
}

export default new SessionsResources();