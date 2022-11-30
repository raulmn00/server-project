import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { IUserEntity } from './entities/user.entity';
import { PartialUserDto } from './services/dto/partialUserInput.dto';

@Injectable()
export class UserRepository {
    constructor(private readonly prisma: PrismaService) {}

    async createUserRepository(user: IUserEntity): Promise<IUserEntity> {
        const createdUser = await this.prisma.user.create({ data: user });
        return createdUser;
    }
    async updateUserRepository(user: PartialUserDto): Promise<IUserEntity> {
        const updatedUser = await this.prisma.user.update({
            where: { id: user.id },
            data: user,
        });

        return updatedUser;
    }
    async deleteUserRepository(userId: string): Promise<IUserEntity> {
        const deletedUser = await this.prisma.user.delete({ where: { id: userId } });
        return deletedUser;
    }
    async findAllUsersRepository(): Promise<IUserEntity[]> {
        const allUsers = await this.prisma.user.findMany();
        return allUsers;
    }
    async findUserByIdRepository(id: string): Promise<IUserEntity> {
        const foundUser = await this.prisma.user.findUniqueOrThrow({ where: { id: id } });
        return foundUser;
    }
}
