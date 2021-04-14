import { Injectable } from '@nestjs/common';
import { User } from '@entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm'
import { CreateUserDTO } from './dto/user.dto';
import { hashSync } from 'bcrypt';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>
    ) { }

    async createUser(data: CreateUserDTO) {
        try {
            const { password } = data;
            const hashed_pass = hashSync(password, 10);

            await this.userRepository.insert({ ...data, password: hashed_pass });
            return true;
        } catch (e) {
            throw e;
        }
    }

    async listAll() {
        try {
            const users = await this.userRepository.find();
            const response_mapped = users.map(user => ({ id: user?.id, name: user?.name, email: user?.email }))
            return response_mapped;
        } catch (e) {
            throw e;
        }
    }
}
