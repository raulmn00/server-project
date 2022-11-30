import { Body, Controller, Get, Patch, Post } from '@nestjs/common';
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
}
