import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Answers, AnswersCreationAttrs } from './model/Answers.model';
import { Reply } from './model/Reply.model';
import { Op } from 'sequelize';
import { QuestionsService } from '../questions/questions.service';

@Injectable()
export class AnswersService {
  constructor(
    @InjectModel(Answers) private answersRepo: typeof Answers,
    @InjectModel(Reply) private replyRepo: typeof Reply,
    private questionsService: QuestionsService,
  ) {}

  async foundOreCreateReply({
    formId,
    userId,
  }: {
    formId: number;
    userId: number;
  }) {
    try {
      const [reply] = await this.replyRepo.findOrCreate({
        where: {
          [Op.and]: [{ formId: formId }],
          [Op.and]: [{ userId: userId }],
        },
        defaults: {
          formId: formId,
          userId: userId,
        },
        include: {
          model: Answers,
        },
      });
      return reply;
    } catch (e) {
      return new HttpException(e, HttpStatus.BAD_REQUEST);
    }
  }

  async createAnswer(dto: {
    questionId: number;
    title: string;
    replyId: number;
  }) {
    try {
      const answer = await this.answersRepo.findOne({
        where: {
          [Op.and]: [{ questionId: dto.questionId }, { replyId: dto.replyId }],
        },
      });
      if (answer) {
        const question = await this.questionsService.getQuestionById(
          dto.questionId,
        );
        if (question.type === 'checkbox') {
          return await this.answersRepo.create({
            questionId: dto.questionId,
            title: dto.title,
            replyId: dto.replyId,
          });
        }
        answer.title = dto.title;
        await answer.save();
        return answer;
      } else {
        return await this.answersRepo.create({
          questionId: dto.questionId,
          title: dto.title,
          replyId: dto.replyId,
        });
      }
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
        this.createAnswer({ ...answer, replyId: dto.userId });
      });
      return new HttpException('Тест пройден', HttpStatus.OK);
    } catch (e) {
      return new HttpException(e, HttpStatus.BAD_REQUEST);
    }
  }
}
