import { IsString, Length } from 'class-validator';

export class UserCreateDto {
  @IsString({ message: 'Must be a string' })
  readonly email: string;

  @IsString({ message: 'Must be a string' })
  @Length(1, 2, {
    message: 'nickname don`t must be less than 1 and more than 20',
  })
  readonly nickname: string;
}
