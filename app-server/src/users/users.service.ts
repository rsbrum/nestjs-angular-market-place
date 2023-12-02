import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDTO } from 'shared/dtos/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  create(createUserDto: CreateUserDTO) {
    return this.userRepository.save(createUserDto);
  }

  findAll() {
    return this.userRepository.find({
      select: {
        id: true,
        username: true,
        password: false,
      },
    });
  }

  findOne(id: number) {
    const user = this.userRepository.findOneBy({ id });
    if (!user) throw new Error('User not found');
    return user;
  }

  async remove(id: number) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) throw new Error('User is not in database');
    return this.userRepository.remove(user);
  }
}
