import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import authConfig from '../../config/auth';
import { User } from '../domain/User';

class UsersServices {
  async encryptPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 12);
  }

  async passwordsMatch(password: string, encryptPassword: string): Promise<boolean> {
    return bcrypt.compare(password, encryptPassword)
  }

  generateToken(user: User): string {
    const { id, name, email } = user;
    const token = jwt.sign(
      { 
        id, 
        name, 
        email, 
      }, 
      authConfig.secret, 
      { 
        expiresIn: authConfig.expiresIn,
      },
    );

    return token;
  }
}

export default new UsersServices();