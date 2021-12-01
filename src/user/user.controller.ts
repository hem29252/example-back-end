import { UserService } from './user.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Headers,
  HttpCode,
} from '@nestjs/common';
import { CreateUserDto } from './create-user.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @HttpCode(200)
  @Post()
  async create(@Body() body: CreateUserDto) {
    return await this.userService.create(body);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.userService.findOne(id);
  }

  @Patch(':id')
  async update(@Body() body: any, @Param('id') id: number) {
    return await this.userService.update(id, body);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return await this.userService.delete(id);
  }
}
