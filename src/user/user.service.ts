import { Injectable } from '@nestjs/common';
import { hash } from 'bcrypt';
import { CreateUserDto } from './dtos/createUser.dto';
import { User } from './interfaces/user.interface';

@Injectable()
export class UserService {
    private users: User[] = [];

    async getAllUsers(): Promise<User[]> {
        return this.users;
    }

    async createUser(createUserDto: CreateUserDto): Promise<User> {
        const saltOrRounds = 10;

        const encriptedPassword = await hash(
            createUserDto.password,
            saltOrRounds,
        );

        this.users.push({
            ...createUserDto,
            id: this.users.length + 1,
            password: encriptedPassword,
        });

        return this.users.at(-1);
    }
}
