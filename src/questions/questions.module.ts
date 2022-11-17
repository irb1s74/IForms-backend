import { Module } from '@nestjs/common';
import { QuestionsController } from './questions.controller';
import { QuestionsService } from './questions.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Questions } from './model/Questions.model';
import { JwtModule } from '@nestjs/jwt';
import { FormsModule } from '../forms/forms.module';

@Module({
  controllers: [QuestionsController],
  providers: [QuestionsService],
  imports: [
    SequelizeModule.forFeature([Questions]),
    FormsModule,
    JwtModule.register({
      secret: process.env.PRIVATE_KEY || 'SECRET_DEV',
      signOptions: {
        expiresIn: '12h',
      },
    }),
  ],
})
export class QuestionsModule {}
