import { IUserEntity } from '../entities/user.entity';
import { UserDto } from './dto/userInput.dto';
import { randomUUID } from 'node:crypto';
import { PartialUserDto } from './dto/partialUserInput.dto';

export class UserService {
    private users: IUserEntity[] = [];

    async createUser(user: UserDto): Promise<IUserEntity> {
        const userEntity = { ...user, id: randomUUID() };
        this.users.push(userEntity);
        return userEntity;
    }
    async updateUser(userData: PartialUserDto): Promise<IUserEntity> {
        this.users.map((user, index) => {
            if (userData.id === user.id) {
                const updatedUser = Object.assign(user, userData);
                this.users.splice(index, 1, updatedUser);
            }
        });
        const userUpdated = this.users.find((user) => user.id === userData.id);
        return userUpdated;
    }
}
