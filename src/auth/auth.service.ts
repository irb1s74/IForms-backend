import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserCreateDto } from 'src/user/dto/UserCreate.dto';
import { UserService } from '../user/user.service';
import { hash, compare } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { UserLoginDto } from '../user/dto/UserLogin.dto';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private mailService: MailerService,
  ) {}

  async reg(dto: UserCreateDto) {
    const candidate = await this.userService.userFindByEmail(dto.email);
    if (candidate) {
      throw new HttpException(
        'Пользователь с таким email или ником существует',
        HttpStatus.BAD_REQUEST,
      );
    }
    const hashPassword = await hash(dto.password, 5);
    const user = await this.userService.userCreate({
      ...dto,
      password: hashPassword,
    });
    return this.generateToken(user);
  }

  async login(userDto: UserLoginDto) {
    const user = await this.validate(userDto);

    return this.generateToken(user);
  }

  async ref(request) {
    const user = await this.userService.userFindByEmail(request.user.email);
    return this.generateToken(user);
  }

  private async generateToken({ email, id, full_name, avatar, role }) {
    return {
      id,
      email,
      avatar,
      full_name,
      role,
      token: this.jwtService.sign({ email, id, role }),
    };
  }

  private async validate({ email, password }: UserLoginDto) {
    const user = await this.userService.userFindByEmail(email);
    if (!user)
      throw new UnauthorizedException({
        message: 'Некорректный email или пароль',
      });
    const passwordEquals = await compare(password, user.password);
    if (passwordEquals) return user;
    throw new UnauthorizedException({
      message: 'Некорректный email или пароль',
    });
  }
}
