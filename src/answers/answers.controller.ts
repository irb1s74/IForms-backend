import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AnswersService } from './answers.service';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { AnswersCreationAttrs } from './model/Answers.model';

@Controller('answers')
export class AnswersController {
  constructor(private answersService: AnswersService) {}

  @Post('/create')
  @UseGuards(JwtAuthGuard)
  createQuestion(
    @Body() dto: AnswersCreationAttrs[],
    @Req()
    request: { user: { id: number } },
  ) {
    return this.answersService.replyAnswers({
      questions: dto,
      userId: request.user.id,
    });
  }

  @Post('')
  @UseGuards(JwtAuthGuard)
  getReply(
    @Body() dto: { formId: number },
    @Req()
    request: { user: { id: number } },
  ) {
    return this.answersService.foundOreCreateReply({
      formId: dto.formId,
      userId: request.user.id,
    });
  }
}
