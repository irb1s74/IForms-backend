import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Variant } from './model/Variant.model';
import { FormsService } from '../forms/forms.service';
import { QuestionsService } from '../questions/questions.service';

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
  ) {
    try {
      const question = await this.questionsService.getQuestionById(questionId);
      const form = await this.formsService.getFormById(question.formId);
      const variant = await this.variantRepo.findByPk(variantId);
      if (form.userId === userId && variant) {
        variant.title = title;
        return await variant.save();
      }
      return new HttpException('Нету доступа', HttpStatus.FORBIDDEN);
    } catch (e) {
      throw new HttpException(e, HttpStatus.BAD_REQUEST);
    }
  }

  async deleteVariant(variantId: number, role: string) {
    try {
      const variant = await this.variantRepo.findByPk(variantId);
      const question = await this.questionsService.getQuestionById(
        variant.questionId,
      );
      if (role === 'HR') {
        await variant.destroy();
        return await this.formsService.getFormById(question.formId);
      }
    } catch (e) {
      throw new HttpException(e, HttpStatus.BAD_REQUEST);
    }
  }
}
