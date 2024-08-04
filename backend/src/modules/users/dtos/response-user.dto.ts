import { UserRole } from '@prisma/client';
import { Expose, Transform } from 'class-transformer';

export class UserResponseDto {
  @Expose()
  user_id: string;

  @Expose()
  username: string;

  @Expose()
  email: string;

  @Expose()
  role_id?: number;

  @Expose()
  created_at: Date;

  @Expose()
  updated_at?: Date;

  @Expose()
  deleted_at?: Date;

  @Expose()
  is_deleted: boolean;

  @Expose()
  @Transform(({ value }) => {
    if (value && typeof value === 'object') {
      return value.role_name;
    }
    return value;
  })
  user_role: UserRole;
}
export class UsersResponseDto {
  @Expose()
  users: UserResponseDto[];

  @Expose()
  total: number;

  @Expose()
  limit: number;

  @Expose()
  offset: number;
}
