import { User } from '../domain/User'
import { AppDataSource } from '../../config/data-source';
import { Repository } from 'typeorm';

class UsersRepository {
  private usersRepository: Repository<User>;

  constructor() {
    this.usersRepository = AppDataSource.getRepository(User);
  }

  async findByEmail(email: string): Promise<User> {
    return await this.usersRepository.findOneBy({ email });
  }

  async checkIfRegisteredEmail(email: string): Promise<boolean> {
    const userFound = await this.usersRepository.findOneBy({ email });
    
    if(userFound) return true;
    
    return false;
  }

  async save(name: string, email: string, office: string): Promise<User> {
    const user = new User();

    user.name = name;
    user.email = email;
    user.office = office;

    return await this.usersRepository.save(user);
  }

  async list(): Promise<User[]> {
    return await this.usersRepository.find();
  }
}

export default new UsersRepository();
