import { User } from '../domain/User'
import { AppDataSource } from '../../config/data-source';
import { Repository } from 'typeorm';

class UsersRepository {
  private usersRepository: Repository<User>;

  constructor() {
    this.usersRepository = AppDataSource.getRepository(User);
  }

  async save(name: string, email: string, office: string) {
    const user = new User(name, email, office);

    return await this.usersRepository.save(user);
  }

  async list() {
    return await this.usersRepository.find();
  }
}

export default new UsersRepository();
