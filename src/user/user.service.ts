import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './model/User.model';
import { UserCreateDto } from './dto/UserCreate.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User) private userRepo: typeof User) {}

  async userCreate(dto: UserCreateDto) {
    return await this.userRepo.create(dto);
  }

  async userFindByEmail(userEmail: string) {
    return await this.userRepo.findOne({ where: { email: userEmail } });
  }
}
