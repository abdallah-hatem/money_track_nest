import { UsersRepository } from './users.repository';
import { User } from '@prisma/client';
export declare class UsersService {
    private usersRepository;
    constructor(usersRepository: UsersRepository);
    findByEmail(email: string): Promise<User | null>;
    create(email: string): Promise<User>;
    findOrCreate(email: string): Promise<User>;
}
