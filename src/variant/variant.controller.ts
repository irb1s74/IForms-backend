import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
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

  @Post('/update')
  @UseGuards(JwtAuthGuard)
  updateQuestion(
    @Body()
    dto: {
      questionId: number;
      variantId: number;
      title: string;
    },
    @Req()
    request: { user: { id: number } },
  ) {
    return this.variantService.updateVariant(
      dto.questionId,
      request.user.id,
      dto.variantId,
      dto.title,
    );
  }

  @Delete('/delete/:id')
  @UseGuards(JwtAuthGuard)
  deleteQuestion(
    @Param('id') variantId,
    @Req()
    request: { user: { id: number } },
  ) {
    return this.variantService.deleteVariant(variantId, request.user.id);
  }
}
