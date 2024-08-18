import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { Serialize } from 'src/common/decorators/serialize/serialize.decorator';
import { UserResponseDto } from './dtos/response-user.dto';
import { Prisma, User } from '@prisma/client';
import { PaginateOptions, PaginatedResult } from 'src/shared/utils/paginator';
import { RolesGuard } from 'src/common/guards/roles/roles.guard';
import { Roles } from 'src/common/decorators/roles/roles.decorator';
import { Role } from 'src/shared/enums/roles';

@Controller('users')
@UseGuards(RolesGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @Roles(Role.Admin)
  async create(@Body() createUserDto: Prisma.UserCreateInput): Promise<User> {
    return this.usersService.create(createUserDto);
  }

  // @Get()
  // @Serialize(UserResponseDto)
  // async findAll(
  //   @Query() query: PaginateOptions,
  // ): Promise<PaginatedResult<UserResponseDto>> {
  //   console.log(query);
  //   return this.usersService.findAll({});
  // }
  @Get()
  @Roles(Role.Admin)
  @Serialize(UserResponseDto)
  async findAll(@Query() query: PaginateOptions): Promise<Promise<User[]>> {
    console.log(query);
    return this.usersService.findAll({});
  }

  @Get(':id')
  @Roles(Role.Admin)
  @Serialize(UserResponseDto)
  async findOne(@Param('id') user_id: string): Promise<User | null> {
    return this.usersService.findOne(user_id);
  }

  @Patch(':id')
  @Roles(Role.Admin)
  async update(
    @Param('id') user_id: string,
    @Body() updateUserDto: Prisma.UserUpdateInput,
  ): Promise<User> {
    return this.usersService.update(user_id, updateUserDto);
  }

  @Delete(':id')
  @Roles(Role.Admin)
  async remove(@Param('id') user_id: string): Promise<User> {
    return this.usersService.remove(user_id);
  }
}
