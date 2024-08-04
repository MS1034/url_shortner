import { Injectable } from '@nestjs/common';
import { UsersRepository } from './user.repository';
import { Prisma, User } from '@prisma/client';
import { PaginateOptions, PaginatedResult } from 'src/common/helpers/paginator';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async create(createUserDto: Prisma.UserCreateInput): Promise<User> {
    return this.usersRepository.create(createUserDto);
  }

  // async findAll(options: PaginateOptions): Promise<PaginatedResult<User>> {
  //   return this.usersRepository.findAll(options);
  // }

  async findAll(options: PaginateOptions): Promise<User[]> {
    return this.usersRepository.findAll();
  }

  async findOne(user_id: string): Promise<User> {
    return this.usersRepository.findOne(user_id);
  }

  async findByEmailorUsername(key: string): Promise<User> {
    return this.usersRepository.findByEmailorUsername(key);
  }

  async update(
    user_id: string,
    updateUserDto: Prisma.UserUpdateInput,
  ): Promise<User> {
    return this.usersRepository.update(user_id, updateUserDto);
  }

  async remove(user_id: string): Promise<User> {
    return this.usersRepository.remove(user_id);
  }
}
