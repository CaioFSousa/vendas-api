import { Injectable } from '@nestjs/common';
import { hash } from 'bcrypt';
import { CreateUserDto } from './dtos/createUser.dto';
import { UserEntity } from './interfaces/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import type { Repository } from 'typeorm';

@Injectable()
export class UserService {

    constructor (@InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>) {}
    

    async getAllUsers(): Promise<UserEntity[]> {
        return this.userRepository.find();
    }

    async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
        const saltOrRounds = 10;

        const encriptedPassword = await hash(
            createUserDto.password,
            saltOrRounds,
        );

        return this.userRepository.save({
            ...createUserDto,
            password: encriptedPassword,
        })
    }
}
