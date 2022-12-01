import { IUserEntity } from '../entities/user.entity';
import { UserDto } from './dto/userInput.dto';
import { randomUUID } from 'node:crypto';
import { PartialUserDto } from './dto/partialUserInput.dto';
import { UserRepository } from '../user.repository';
import { Injectable } from '@nestjs/common';
import { Exceptions } from 'src/utils/exceptions/exceptionsHelper';

@Injectable()
export class UserService {
    //private users: IUserEntity[] = [];

    constructor(private readonly userRepository: UserRepository) {}

    async createUserService(user: UserDto): Promise<IUserEntity> {
        const userEntity = { ...user, id: randomUUID() };

        if (user.password.length <= 7) {
            throw {
                message: 'Password must be have 7 or more characters.',
                exception: Exceptions.InvalidData,
            };
        }
        const createdUser = await this.userRepository.createUserRepository(userEntity);
        return createdUser;
    }
    async updateUserService(userData: PartialUserDto): Promise<IUserEntity> {
        const userUpdated = await this.userRepository.updateUserRepository(userData);
        return userUpdated;
    }
    async getAllUsersService(): Promise<IUserEntity[]> {
        return await this.userRepository.findAllUsersRepository();
    }

    async deleteUserByIdService(userId: string): Promise<boolean> {
        try {
            const existUser = await this.userRepository.deleteUserRepository(userId);
            if (existUser) {
                return true;
            } else {
                return false;
            }
        } catch (err) {
            console.log(err);
            return false;
        }
    }
    async getUserByIdService(userId: string): Promise<IUserEntity> {
        const userFinded = this.userRepository.findUserByIdRepository(userId);
        if (!userFinded) {
            throw new Error('User not found.');
        } else {
            return userFinded;
        }
    }
}
