import { UserEntity } from './user.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async create(body: CreateUserDto) {
    return await this.userRepository.create(body).save();
  }

  findAll() {
    return this.userRepository.find();
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOne(id);
    if (!user) {
      throw new NotFoundException('Not found user!');
    }
    return user;
  }

  async update(id: number, body: Partial<UserEntity>) {
    const user = await this.findOne(id);
    Object.assign(user, body);
    await this.userRepository.save(user);
  }

  async delete(id: number) {
    const user = await this.findOne(id);
    this.userRepository.delete(id);
  }
}
