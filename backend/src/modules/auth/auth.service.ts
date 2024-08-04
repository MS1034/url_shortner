import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import PasswordHelper from 'src/shared/utils/hashing';
import { JwtService } from '@nestjs/jwt';
import { Prisma, User } from '@prisma/client';
import { access } from 'fs';
import { generateFromEmail } from 'unique-username-generator';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {
    // this.signUp('muhammadsubhan57012@gmail.com', '0000');
  }

  async signIn(username: string, password: string): Promise<any> {
    const user: User = await this.usersService.findByEmailorUsername(username);

    if (!user) {
      throw new UnauthorizedException('User does not exist');
    }

    const isAuthorized = await PasswordHelper.compareHash(
      password,
      user.password_hash,
    );
    console.log(isAuthorized);
    if (!isAuthorized || user.is_deleted) {
      throw new UnauthorizedException('Wrong password');
    }

    const payload = {
      user_id: user.user_id,
      username: user.username,
      role_id: user.role_id,
      email: user.email,
    };
    if (user['user_role'] && typeof user['user_role'] == 'object') {
      payload['user_role'] = user['user_role']['role_name'];
    }
    console.log(payload['user_role']);

    const token = await this.jwtService.signAsync(payload);
    return {
      ...user,
      token,
    };
  }

  async signUp(email: string, password: string): Promise<any> {
    const password_hash = await PasswordHelper.getPasswordHash(password);
    const username = generateFromEmail(email, 5);
    const createDTO: Prisma.UserCreateInput = {
      email,
      password_hash,
      username,
      user_role: {
        connect: { role_id: 1 },
      },
    };
    const user: User = await this.usersService.create(createDTO);
    const payload = {
      id: user.user_id,
      username: user.username,
      role_id: user.role_id,
    };
    // const token = await this.jwtService.signAsync(payload);

    // return { ...user, token };
    return user;
  }

  async checkUserName(username: string) {
    return this.usersService.findByEmailorUsername(username);
  }
}
