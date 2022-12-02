import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Exceptions } from 'src/utils/exceptions/exceptionsHelper';
import { IUserEntity } from './entities/user.entity';
import { PartialUserDto } from './services/dto/partialUserInput.dto';
import { ExceptionClass } from 'src/utils/exceptions/Exception';

@Injectable()
export class UserRepository {
    constructor(private readonly prisma: PrismaService) {}

    async createUserRepository(user: IUserEntity): Promise<IUserEntity> {
        try {
            const createdUser = await this.prisma.user.create({ data: user });
            return createdUser;
        } catch (err) {
            throw new ExceptionClass(
                Exceptions.DatabaseException,
                'Error creating user. Email or CPF already exists.',
            );
        }
    }
    async updateUserRepository(user: PartialUserDto): Promise<IUserEntity> {
        try {
            const updatedUser = await this.prisma.user.update({
                where: { id: user.id },
                data: user,
            });
            return updatedUser;
        } catch (err) {
            throw new ExceptionClass(
                Exceptions.DatabaseException,
                'Error updating user. Please, verify the data sent.',
            );
        }
    }
    async deleteUserRepository(userId: string): Promise<IUserEntity> {
        try {
            const deletedUser = await this.prisma.user.delete({ where: { id: userId } });
            return deletedUser;
        } catch (err) {
            throw new ExceptionClass(
                Exceptions.DatabaseException,
                'Error deleting user. Please verify the ID sent.',
            );
        }
    }
    async findAllUsersRepository(): Promise<IUserEntity[]> {
        try {
            const allUsers = await this.prisma.user.findMany();
            return allUsers;
        } catch (err) {
            throw new ExceptionClass(Exceptions.DatabaseException, err.message);
        }
    }
    async findUserByIdRepository(id: string): Promise<IUserEntity> {
        try {
            const foundUser = await this.prisma.user.findUniqueOrThrow({ where: { id: id } });
            return foundUser;
        } catch (err) {
            throw new ExceptionClass(
                Exceptions.DatabaseException,
                'Error finding user. Please verify the ID sent.',
            );
        }
    }
}
