import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UserDto {
    @ApiProperty()
    @IsString()
    name: string;

    @ApiProperty()
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty()
    @IsString()
    password: string;

    @ApiProperty()
    @IsString()
    cpf: string;

    @ApiProperty()
    @IsString()
    role: string;
}
