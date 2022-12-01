import { Module } from '@nestjs/common';
import { SubdivisionController } from './subdivision.controller';
import { SubdivisionService } from './subdivision.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { JwtModule } from '@nestjs/jwt';
import { Subdivision } from './model/Subdivision.model';

@Module({
  controllers: [SubdivisionController],
  providers: [SubdivisionService],
  imports: [
    SequelizeModule.forFeature([Subdivision]),
    JwtModule.register({
      secret: process.env.PRIVATE_KEY || 'SECRET_DEV',
      signOptions: {
        expiresIn: '12h',
      },
    }),
  ],
})
export class SubdivisionModule {}
