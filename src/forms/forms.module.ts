import { Module } from '@nestjs/common';
import { FormsController } from './forms.controller';
import { FormsService } from './forms.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Forms } from './model/Forms.model';

@Module({
  controllers: [FormsController],
  providers: [FormsService],
  imports: [SequelizeModule.forFeature([Forms])],
})
export class FormsModule {}
