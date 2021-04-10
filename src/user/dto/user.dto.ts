import { IsString, IsNotEmpty } from 'class-validator';

export class CreateUserDTO {
    @IsNotEmpty()
    @IsString()
    name: string;
    @IsNotEmpty()
    @IsString()
    email: string;
    @IsNotEmpty()
    @IsString()
    password: string;
}