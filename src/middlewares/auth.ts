import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import authConfig from '../config/auth';

interface JwtPayload {
  id: string,
  name: string,
  email: string,
  iat: number,
  exp: number,
}

export default async (request: Request, response: Response, nextFunction: NextFunction) => {
  const { authorization } = request.headers;

  if(!authorization) return response.status(401).json({
    error: 'Validation Fails.',
  });

  const [ , token ] = authorization.split(' ');

  if(!token) return response.status(401).json({
    error: 'Validation Fails.',
  });

  try {
    const decoded = jwt.verify(token, authConfig.secret);
    const { id, name, email } = decoded as JwtPayload;
      
    request.userId = id;
    request.userName = name;
    request.userEmail = email;

    return nextFunction();

  } catch (error) {
    return response.status(401).json({
      error: 'Invalid Token.',
    });
  }
}