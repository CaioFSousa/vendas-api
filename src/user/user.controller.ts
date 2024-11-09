import { Body, Controller, Post } from '@nestjs/common';
import type { CreateUserDto } from './dtos/createUser.dto';

@Controller('user')
export class UserController {
    @Post()
    async createUser(@Body() createUser: CreateUserDto) {
        return {
            ...createUser,
            password: undefined,
        };
    }
}
