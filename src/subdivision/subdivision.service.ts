import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Subdivision } from './model/Subdivision.model';

@Injectable()
export class SubdivisionService {
  constructor(
    @InjectModel(Subdivision) private subdivisionRepo: typeof Subdivision,
  ) {}

  async formStats() {
    try {
      this.subdivisionRepo.findAll({});
    } catch (e) {}
  }
}
