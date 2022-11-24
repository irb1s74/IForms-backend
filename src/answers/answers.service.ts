import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Answers, AnswersCreationAttrs } from './model/Answers.model';

@Injectable()
export class AnswersService {
  constructor(@InjectModel(Answers) private answersRepo: typeof Answers) {}

  async createAnswer(dto: {
    questionId: number;
    title: string;
    userId: number;
  }) {
    try {
      return await this.answersRepo.create({
        questionId: dto.questionId,
        title: dto.title,
        userId: dto.userId,
      });
    } catch (e) {
      return new HttpException(e, HttpStatus.BAD_REQUEST);
    }
  }

  async replyAnswers(dto: {
    questions: AnswersCreationAttrs[];
    userId: number;
  }) {
    try {
      dto.questions.forEach((answer) => {
        this.createAnswer({ ...answer, userId: dto.userId });
      });
      return new HttpException('Тест пройден', HttpStatus.OK);
    } catch (e) {
      return new HttpException(e, HttpStatus.BAD_REQUEST);
    }
  }
}
