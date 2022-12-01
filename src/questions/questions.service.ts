import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Questions } from './model/Questions.model';
import { FormsService } from '../forms/forms.service';
import { FileService } from '../file/file.service';

@Injectable()
export class QuestionsService {
  constructor(
    @InjectModel(Questions) private questionsRepo: typeof Questions,
    private filesService: FileService,
    private formsService: FormsService,
  ) {}

  async getQuestionById(questionId: number) {
    try {
      return await this.questionsRepo.findByPk(questionId);
    } catch (e) {
      throw new HttpException(e, HttpStatus.BAD_REQUEST);
    }
  }

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
        return await this.formsService.getFormById(formId);
      }
      return new HttpException('Неправильный запрос', HttpStatus.BAD_REQUEST);
    } catch (e) {
      throw new HttpException(e, HttpStatus.BAD_REQUEST);
    }
  }

  async updateQuestions({
    type,
    title,
    required,
    questionId,
  }: {
    questionId: number;
    title: string;
    type: string;
    required: boolean;
  }) {
    try {
      const question = await this.questionsRepo.findByPk(questionId);
      question.title = title;
      question.type = type;
      question.required = required;
      await question.save();
      return question;
    } catch (e) {
      return new HttpException(e, HttpStatus.BAD_REQUEST);
    }
  }

  async updateImageQuestion(questionId: number, image: any) {
    try {
      const imagePath = await this.filesService.createFile(image, 'questions');
      const question = await this.questionsRepo.findByPk(questionId);
      question.title = imagePath;
      question.type = 'image';
      await question.save();
      return question;
    } catch (e) {
      return new HttpException(e, HttpStatus.BAD_REQUEST);
    }
  }

  async deleteQuestions(userId: number, questionId: number) {
    try {
      const question = await this.questionsRepo.findByPk(questionId);
      const form = await this.formsService.getFormById(question.formId);
      if (form.userId === userId) {
        await question.destroy();
        return await this.formsService.getFormById(question.formId);
      }
      return new HttpException('Нету доступа', HttpStatus.FORBIDDEN);
    } catch (e) {
      throw new HttpException('Неправильный запрос', HttpStatus.BAD_REQUEST);
    }
  }
}
