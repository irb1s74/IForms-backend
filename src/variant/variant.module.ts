import { Module } from '@nestjs/common';
import { VariantController } from './variant.controller';
import { VariantService } from './variant.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Variant } from './model/Variant.model';
import { FormsModule } from '../forms/forms.module';
import { JwtModule } from '@nestjs/jwt';
import { QuestionsModule } from '../questions/questions.module';

@Module({
  controllers: [VariantController],
  providers: [VariantService],
  imports: [
    SequelizeModule.forFeature([Variant]),
    FormsModule,
    QuestionsModule,
    JwtModule.register({
      secret: process.env.PRIVATE_KEY || 'SECRET_DEV',
      signOptions: {
        expiresIn: '12h',
      },
    }),
  ],
})
export class VariantModule {}
