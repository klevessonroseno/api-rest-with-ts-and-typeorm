import { Request, Response } from 'express';
import usersRepository from '../repositories/UsersRepository';
import usersServices from '../services/UsersServices';
import * as Yup from 'yup';

class UsersResources {
  async get(request: Request, response: Response) {
    const users = await usersRepository.list();

    response.status(200).json({ users });
  }

  async store(request: Request, response: Response) {
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required().max(100),
        email: Yup.string().email().max(100).required(),
        password: Yup.string().required().min(6).max(10),
      });
  
      const schemaIsValid = await schema.isValid(request.body);
  
      if(!schemaIsValid) {
        return response.status(400).json({
          error: 'Validation failed.',                
        });
      }
  
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

    } catch (error) {
      response.status(500).json({ 
        error: 'Something went wrong.',
      });
    }
  }
}

export default new UsersResources();
