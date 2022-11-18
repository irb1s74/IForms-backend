import { InjectModel } from '@nestjs/sequelize';
import { Forms } from './model/Forms.model';
import { HttpException, HttpStatus } from '@nestjs/common';
import { Questions } from '../questions/model/Questions.model';

export class FormsService {
  constructor(@InjectModel(Forms) private formsRepo: typeof Forms) {}

  async getForms(userId: number) {
    return await this.formsRepo.findAll({
      where: {
        userId: userId,
      },
    });
  }

  async getFormById(formId: number) {
    return await this.formsRepo.findByPk(formId, {
      include: {
        model: Questions,
      },
    });
  }

  async formsCreate(userId: number, title: string) {
    return await this.formsRepo.create({ userId, title });
  }

  async updateForm(formId: number, title: string) {
    try {
      const form = await this.formsRepo.findByPk(formId);
      form.title = title;
      await form.save();
      return form;
    } catch (e) {
      throw new HttpException('Неправильный запрос', HttpStatus.BAD_REQUEST);
    }
  }

  async deleteForm(formId: number) {
    try {
      await this.formsRepo.destroy({ where: { id: formId } });
      return new HttpException('Форма удалена', HttpStatus.OK);
    } catch (e) {
      throw new HttpException('Неправильный запрос', HttpStatus.BAD_REQUEST);
    }
  }
}
