import { Module } from '@nestjs/common';
import { AnswersService } from './answers.service';
import { AnswersController } from './answers.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Answers } from './model/Answers.model';
import { QuestionsModule } from '../questions/questions.module';
import { JwtModule } from '@nestjs/jwt';
import { Reply } from './model/Reply.model';

@Module({
  providers: [AnswersService],
  controllers: [AnswersController],
  imports: [
    SequelizeModule.forFeature([Answers, Reply]),
    QuestionsModule,
    JwtModule.register({
      secret: process.env.PRIVATE_KEY || 'SECRET_DEV',
      signOptions: {
        expiresIn: '12h',
      },
    }),
  ],
})
export class AnswersModule {}
