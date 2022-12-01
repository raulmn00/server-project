import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Res,
    BadRequestException,
} from '@nestjs/common';
import { IUserEntity } from './entities/user.entity';
import { PartialUserDto } from './services/dto/partialUserInput.dto';
import { UserDto } from './services/dto/userInput.dto';
import { UserService } from './services/user.service';
import { Response } from 'express';
import { handleException } from 'src/utils/exceptions/exceptionsHelper';

@Controller('user')
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
            handleException(err);
        }
    }

    @Post()
    async createUserController(
        @Body() { name, email, password, role, cpf }: UserDto,
        @Res() response: Response,
    ) {
        try {
            const result = await this.userService.createUserService({
                name,
                email,
                password,
                role,
                cpf,
            });
            response.status(201).send(result);
        } catch (err) {
            handleException(err);
        }
    }

    @Patch()
    async updateUserController(@Body() userData: PartialUserDto): Promise<IUserEntity> {
        try {
            return await this.userService.updateUserService(userData);
        } catch (err) {
            handleException(err);
        }
    }

    @Delete(':id')
    async deleteUserController(@Param('id') userId: string): Promise<string> {
        const userIsDeleted = await this.userService.deleteUserByIdService(userId);
        if (userIsDeleted) {
            return 'User deleted succefully.';
        } else {
            return 'User not found.';
        }
    }
}
