import { BadRequestException, Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Post, Get, Body, Query } from '@nestjs/common';
import { Serialize } from 'src/common/decorators/serialize/serialize.decorator';
import { AuthResponseDto } from './dtos/response-auth.dto';
import PasswordHelper from 'src/shared/utils/hashing';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  @Serialize(AuthResponseDto)
  async signup(@Body() body): Promise<any> {
    const { email, password } = body;
    if (!email || !password) {
      throw new BadRequestException(
        'Email and Password are required to signup',
      );
    }
    if (!PasswordHelper.validatePassword(password)) {
      throw new BadRequestException(
        'Password does not meet the password policy: {8-25 characters atleast one chaarcter from upper case,one from lower and one from 0-9}',
      );
    }

    return this.authService.signUp(email, password);
  }

  @Post('/login')
  @Serialize(AuthResponseDto)
  async login(@Body() body): Promise<any> {
    const { email, password } = body;
    if (!email || !password) {
      throw new BadRequestException(
        'Email and Password are required to signin',
      );
    }

    return this.authService.signIn(email, password);
  }

  @Get('/check-username')
  async checkUsername(@Query('username') username: string) {
    const user = await this.authService.checkUserName(username);
    if (user) {
      return { available: false };
    }
    return { available: true };
  }
}
