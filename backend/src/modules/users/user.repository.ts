import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
import {
  paginator,
  PaginateOptions,
  PaginatedResult,
} from 'src/shared/utils/paginator';

@Injectable()
export class UsersRepository {
  constructor(private readonly prisma: DatabaseService) {}

  async create(createUserDto: Prisma.UserCreateInput): Promise<User> {
    return this.prisma.user.create({ data: createUserDto });
  }

  //   async findAll(options: PaginateOptions): Promise<User[] | null> {
  //     const paginate = paginator({ page: 1, perPage: 10 });
  //     return this.prisma.user.findMany(paginate);
  //   }

  async findAll(): Promise<User[]> {
    return this.prisma.user.findMany({
      include: {
        user_role: true,
      },
    });
  }

  async findOne(user_id: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { user_id },
      include: {
        user_role: true,
      },
    });
  }

  async findByEmailorUsername(key: string): Promise<User> {
    return await this.prisma.user.findFirst({
      include: {
        user_role: true,
      },
      where: {
        OR: [{ email: key }, { username: key }],
      },
    });
  }

  async update(
    user_id: string,
    updateUserDto: Prisma.UserUpdateInput,
  ): Promise<User> {
    return this.prisma.user.update({
      where: { user_id },
      data: updateUserDto,
    });
  }

  async remove(user_id: string): Promise<User> {
    return this.prisma.user.delete({ where: { user_id } });
  }
}
