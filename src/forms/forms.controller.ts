import { Body, Controller, Post } from '@nestjs/common';
import { FormsService } from './forms.service';

@Controller('forms')
export class FormsController {
  constructor(private formsService: FormsService) {}

  @Post('/create')
  createForms(@Body() dto: { userId: number; title: string }) {
    return this.formsService.formsCreate(dto);
  }
}
