import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Questions } from './model/Questions.model';
import { FormsService } from '../forms/forms.service';

@Injectable()
export class QuestionsService {
  constructor(
    @InjectModel(Questions) private questionsRepo: typeof Questions,
    private formsService: FormsService,
  ) {}

  async questionsCreate(
    formId: number,
    title: string,
    type: string,
    userId: number,
  ) {
    try {
      const form = await this.formsService.getFormById(formId);
      if (form.userId === userId) {
        await this.questionsRepo.create({ formId, type });
        return this.formsService.getFormById(formId);
      }
      return new HttpException('Неправильный запрос', HttpStatus.BAD_REQUEST);
    } catch (e) {
      throw new HttpException(e, HttpStatus.BAD_REQUEST);
    }
  }

  async updateQuestions(formId: number, title: string) {
    try {
      const question = await this.questionsRepo.findByPk(formId);
      question.title = title;
      await question.save();
      return question;
    } catch (e) {
      throw new HttpException('Неправильный запрос', HttpStatus.BAD_REQUEST);
    }
  }

  async deleteQuestions(questionId: number) {
    try {
      await this.questionsRepo.destroy({ where: { id: questionId } });
      return new HttpException('Вопрос удален', HttpStatus.OK);
    } catch (e) {
      throw new HttpException('Неправильный запрос', HttpStatus.BAD_REQUEST);
    }
  }
}
