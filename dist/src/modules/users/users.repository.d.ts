import { PrismaService } from '../../common/prisma/prisma.service';
import { User, Prisma } from '@prisma/client';
export declare class UsersRepository {
    private prisma;
    constructor(prisma: PrismaService);
    findOne(userWhereUniqueInput: Prisma.UserWhereUniqueInput): Promise<User | null>;
    create(data: Prisma.UserCreateInput): Promise<User>;
    findOrCreate(email: string): Promise<User>;
}
