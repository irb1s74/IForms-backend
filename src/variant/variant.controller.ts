import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { VariantService } from './variant.service';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

@Controller('variant')
export class VariantController {
  constructor(private variantService: VariantService) {}

  @Post('/create')
  @UseGuards(JwtAuthGuard)
  createQuestion(
    @Body() dto: { questionId: number },
    @Req()
    request: { user: { id: number } },
  ) {
    return this.variantService.createVariant(dto.questionId);
  }
}
