import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { FormsService } from './forms.service';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

@Controller('forms')
export class FormsController {
  constructor(private formsService: FormsService) {}

  @Post('/create')
  @UseGuards(JwtAuthGuard)
  createForms(
    @Body() dto: { title: string },
    @Req()
    request: { user: { id: number } },
  ) {
    return this.formsService.formsCreate(request.user.id, dto.title);
  }

  @Get('/:id')
  @UseGuards(JwtAuthGuard)
  getForm(@Param('id') postId) {
    return this.formsService.getFormById(postId);
  }

  @Post('/update')
  @UseGuards(JwtAuthGuard)
  updateForms(@Body() dto: { formId: number; title: string }) {
    return this.formsService.updateForm(dto.formId, dto.title);
  }

  @Delete('/delete')
  @UseGuards(JwtAuthGuard)
  deleteForms(@Body() dto: { formId: number }) {
    return this.formsService.deleteForm(dto.formId);
  }
}
