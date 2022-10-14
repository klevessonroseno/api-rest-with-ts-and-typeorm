import { Request, Response } from 'express';
import usersRepository from '../repositories/UsersRepository';
import usersServices from '../services/UsersServices';
import * as Yup from 'yup';

class SessionsResources {
  async store(request: Request, response: Response) {
    try {
      const schema = Yup.object().shape({
        email: Yup.string().email().max(100).required(),
        password: Yup.string().required().min(6).max(10),
      });
  
      const schemaIsValid = await schema.isValid(request.body);
  
      if(!schemaIsValid) {
        return response.status(400).json({
          error: 'Validation failed.',                
        });
      }

      const { email, password } = request.body;
      const emailRegistered = await usersRepository.checkIfRegisteredEmail(email);

      if(!emailRegistered) return response.status(404).json({ 
        error: 'Email not registered.',
      });

      const user = await usersRepository.findByEmail(email);
      const passwordsMatch = await usersServices.passwordsMatch(password, user.password);

      if(!passwordsMatch) return response.status(401).json({
        error: 'Passwords do not match.',
      });

      const token = usersServices.generateToken(user);

      return response.status(200).json({ token });

    } catch (error) {
      return response.status(500).json({
        error: 'Something went wrong.'
      });
    }
  }
}

export default new SessionsResources();
