import { UserRole } from '@prisma/client';
import { Expose, Transform } from 'class-transformer';

export class AuthResponseDto {
  // @Expose()
  // user_id: string;

  // @Expose()
  // username: string;

  // @Expose()
  // email: string;

  // @Expose()
  // role_id: number;

  // @Expose()
  // @Transform(({ value }) => {
  //   if (value && typeof value === 'object') {
  //     return value.role_name;
  //   }
  //   return value;
  // })
  // user_role: UserRole;

  @Expose()
  token: String;
}
