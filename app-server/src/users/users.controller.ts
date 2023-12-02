import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDTO } from 'shared/dtos/create-user.dto';

@Controller('auth')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDTO) {
    const newUser = await this.userService.create(createUserDto);
    return { id: newUser.id, username: newUser.username };
  }

  @Get()
  async findAll() {
    const users = await this.userService.findAll();
    return users;
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    const user = await this.userService.findOne(id);
    return { id: user.id, username: user.username };
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    await this.userService.remove(id);
    return { message: 'User removed successfully' };
  }
}
