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
}
