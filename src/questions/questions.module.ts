import { Module } from '@nestjs/common';
import { QuestionsController } from './questions.controller';
import { QuestionsService } from './questions.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Questions } from './model/Questions.model';
import { JwtModule } from '@nestjs/jwt';
import { FormsModule } from '../forms/forms.module';
import { FileModule } from '../file/file.module';

@Module({
  controllers: [QuestionsController],
  providers: [QuestionsService],
  imports: [
    SequelizeModule.forFeature([Questions]),
    FormsModule,
    FileModule,
    JwtModule.register({
      secret: process.env.PRIVATE_KEY || 'SECRET_DEV',
      signOptions: {
        expiresIn: '12h',
      },
    }),
  ],
  exports: [QuestionsService],
})
export class QuestionsModule {}
