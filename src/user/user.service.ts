import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './model/User.model';
import { UserCreateDto } from './dto/UserCreate.dto';
import { FileService } from '../file/file.service';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User) private userRepo: typeof User,
    private filesService: FileService,
  ) {}

  async findEmployee() {
    return this.userRepo.findAll({ where: { role: 'employee' } });
  }

  async userCreate(dto: UserCreateDto) {
    return await this.userRepo.create(dto);
  }

  async userFindByEmail(userEmail: string) {
    return await this.userRepo.findOne({ where: { email: userEmail } });
  }

  async updateAvatar(avatar: any, req) {
    try {
      const avatarPath = await this.filesService.createFile(avatar, 'avatars');
      const user = await this.userFindByEmail(req.user.email);
      user.avatar = avatarPath;
      await user.save();
      return user.avatar;
    } catch (e) {
      throw new HttpException(
        'Пользователь не найден',
        HttpStatus.UNAUTHORIZED,
      );
    }
  }
}
