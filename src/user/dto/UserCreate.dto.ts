import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class UserCreateDto {
  @IsString({ message: 'Должен быть строкой' })
  @IsEmail(undefined, {
    message: 'Не валидный email',
  })
  readonly email: string;

  @IsString({ message: 'Должен быть строкой' })
  @IsNotEmpty({
    message: 'ФИО не может быть пустым',
  })
  readonly full_name: string;

  @IsString({ message: 'Должен быть строкой' })
  @Length(6, 400, {
    message: 'Пароль  не должен быть меньше  6 символов',
  })
  readonly password: string;
}
