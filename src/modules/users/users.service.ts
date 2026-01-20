import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { User } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private usersRepository: UsersRepository) {}

  async findByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOne({ email });
  }

  async create(email: string): Promise<User> {
    return this.usersRepository.create({ email });
  }

  async findOrCreate(email: string): Promise<User> {
    return this.usersRepository.findOrCreate(email);
  }
}
