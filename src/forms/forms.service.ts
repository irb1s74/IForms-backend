import { InjectModel } from '@nestjs/sequelize';
import { Forms } from './model/Forms.model';

export class FormsService {
  constructor(@InjectModel(Forms) private formsRepo: typeof Forms) {}

  async formsCreate(dto: { userId: number; title: string }) {
    return await this.formsRepo.create(dto);
  }
}
