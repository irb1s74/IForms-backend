import { IsString, Length } from 'class-validator';

export class UserLoginDto {
  @IsString({ message: 'Must be a string' })
  readonly email: string;

  @IsString({ message: 'Must be a string' })
  @Length(6, 400, {
    message: 'Password don`t must be less than 6 and more than 400',
  })
  readonly password: string;
}
