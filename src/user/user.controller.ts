import { Controller, Post, ValidationPipe, Res, Body, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDTO } from './dto/user.dto';
import { Response } from 'express';

@Controller('user')
export class UserController {
    constructor(
        private userService: UserService
    ) { }

    @Post()
    async createUser(@Body(new ValidationPipe) createUserDTO: CreateUserDTO, @Res() res: Response): Promise<void> {
        try {
            const response = await this.userService.createUser(createUserDTO);
            res.status(201).json({ "success": response })
        } catch (e) {
            const { status, response } = e;
            res.status(status || 500).json(response)
        }
    }

    @Get('/all')
    async listAll(@Res() res: Response): Promise<void> {
        try {
            const response = await this.userService.listAll();
            res.status(201).json(response)
        } catch (e) {
            const { status, response } = e;
            res.status(status || 500).json(response)
        }
    }
}
