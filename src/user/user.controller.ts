import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { IUserEntity } from './entities/user.entity';
import { PartialUserDto } from './services/dto/partialUserInput.dto';
import { UserDto } from './services/dto/userInput.dto';
import { UserService } from './services/user.service';

@Controller()
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    async getAllUsersController(): Promise<IUserEntity[]> {
        return await this.userService.getAllUsersService();
    }
    @Get(':id')
    async getUserByIdController(@Param('id') userId: string): Promise<IUserEntity> {
        try {
            return await this.userService.getUserByIdService(userId);
        } catch (err) {
            console.log(err);
        }
    }

    @Post()
    async createUserController(
        @Body() { name, email, password, role, cpf }: UserDto,
    ): Promise<IUserEntity> {
        try {
            return await this.userService.createUserService({
                name,
                email,
                password,
                role,
                cpf,
            });
        } catch (err) {
            console.log('Erro no servidor ' + err);
        }
    }

    @Patch()
    async updateUserController(@Body() userData: PartialUserDto): Promise<IUserEntity> {
        try {
            return await this.userService.updateUserService(userData);
        } catch (err) {
            console.log(err);
        }
    }

    @Delete(':id')
    async deleteUserController(@Param('id') userId: string): Promise<string> {
        try {
            const userIsDeleted = await this.userService.deleteUserByIdService(userId);
            if (userIsDeleted) {
                return 'User deleted succefully.';
            } else {
                return 'User not found.';
            }
        } catch (err) {
            console.log(err);
        }
    }
}
