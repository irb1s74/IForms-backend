import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Variant } from './model/Variant.model';
import { FormsService } from '../forms/forms.service';
import { QuestionsService } from '../questions/questions.service';
import { where } from 'sequelize';

@Injectable()
export class VariantService {
  constructor(
    @InjectModel(Variant) private variantRepo: typeof Variant,
    private formsService: FormsService,
    private questionsService: QuestionsService,
  ) {}

  async createVariant(questionId: number) {
    try {
      const question = await this.questionsService.getQuestionById(questionId);
      await this.variantRepo.create({ questionId });
      return await this.formsService.getFormById(question.formId);
    } catch (e) {
      throw new HttpException(e, HttpStatus.BAD_REQUEST);
    }
  }

  async updateVariant(
    questionId: number,
    userId: number,
    variantId: number,
    title: string,
    correct: boolean,
  ) {
    try {
      const question = await this.questionsService.getQuestionById(questionId);
      const form = await this.formsService.getFormById(question.formId);
      const variant = await this.variantRepo.findByPk(variantId);
      if (form.userId === userId && variant) {
        variant.title = title;
        variant.correct = correct;
        return await variant.save();
      }
      new HttpException('Нету доступа', HttpStatus.FORBIDDEN);
    } catch (e) {
      throw new HttpException(e, HttpStatus.BAD_REQUEST);
    }
  }

  async deleteVariant(variantId: number, userId: number) {
    try {
      const variant = await this.variantRepo.findByPk(variantId);
      const question = await this.questionsService.getQuestionById(
        variant.questionId,
      );
      const form = await this.formsService.getFormById(question.formId);
      if (form.userId === userId) {
        await variant.destroy();
        return await this.formsService.getFormById(question.formId);
      }
    } catch (e) {
      throw new HttpException(e, HttpStatus.BAD_REQUEST);
    }
  }
}
