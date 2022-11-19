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
  getForm(@Param('id') formId) {
    return this.formsService.getFormById(formId);
  }

  @Get('')
  @UseGuards(JwtAuthGuard)
  getFormsUser(@Req() request: { user: { id: number } }) {
    return this.formsService.getForms(request.user.id);
  }

  @Post('/update')
  @UseGuards(JwtAuthGuard)
  updateForms(@Body() dto: { formId: number; title: string }) {
    return this.formsService.updateForm(dto.formId, dto.title);
  }

  @Delete('/delete/:id')
  @UseGuards(JwtAuthGuard)
  deleteForms(@Req() request: { user: { id: number } }, @Param('id') formId) {
    return this.formsService.deleteForm(request.user.id, formId);
  }
}
