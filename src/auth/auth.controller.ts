import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserCreateDto } from '../user/dto/UserCreate.dto';
import { UserLoginDto } from '../user/dto/UserLogin.dto';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/reg')
  @UsePipes(ValidationPipe)
  reg(@Body() dto: UserCreateDto) {
    return this.authService.reg(dto);
  }

  @Post('/login')
  @UsePipes(ValidationPipe)
  login(@Body() dto: UserLoginDto) {
    return this.authService.login(dto);
  }

  @Get('/ref')
  @UseGuards(JwtAuthGuard)
  ref(@Req() request: Request) {
    return this.authService.ref(request);
  }
}
