import { Module } from '@nestjs/common';
import { FormsController } from './forms.controller';
import { FormsService } from './forms.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Forms } from './model/Forms.model';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [FormsController],
  providers: [FormsService],
  imports: [
    SequelizeModule.forFeature([Forms]),
    JwtModule.register({
      secret: process.env.PRIVATE_KEY || 'SECRET_DEV',
      signOptions: {
        expiresIn: '12h',
      },
    }),
  ],
  exports: [FormsService],
})
export class FormsModule {}
