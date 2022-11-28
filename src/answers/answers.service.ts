import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Answers } from './model/Answers.model';
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

  async findOreCreateReply({
    formId,
    userId,
  }: {
    formId: number;
    userId: number;
  }) {
    try {
      const [reply] = await this.replyRepo.findOrCreate({
        where: {
          [Op.and]: [{ formId: formId }, { userId: userId }, { draft: true }],
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
      return await this.answersRepo.create({
        questionId: dto.questionId,
        title: dto.title,
        replyId: dto.replyId,
      });
    } catch (e) {
      return new HttpException(e, HttpStatus.BAD_REQUEST);
    }
  }

  async unDraftReply(replyId: number) {
    try {
      const reply = await this.replyRepo.findByPk(replyId);
      reply.draft = false;
      return await reply.save();
    } catch (e) {
      return new HttpException(e, HttpStatus.BAD_REQUEST);
    }
  }

  async saveReply(replyId: number, answers: Record<number, string | string[]>) {
    try {
      for (const [id, title] of Object.entries(answers)) {
        const questionId = Number(id);
        if (Array.isArray(title)) {
          title.forEach((title) =>
            this.createAnswer({ questionId, title, replyId }),
          );
        } else {
          await this.createAnswer({ questionId, title, replyId });
        }
      }
      return await this.unDraftReply(replyId);
    } catch (e) {
      return new HttpException(e, HttpStatus.BAD_REQUEST);
    }
  }
}
