import { Expose } from 'class-transformer';

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
