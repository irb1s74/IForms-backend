import { Body, Controller, Delete, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { QuestionsService } from './questions.service';

@Controller('questions')
export class QuestionsController {
  constructor(private questionService: QuestionsService) {}

  @Post('/create')
  @UseGuards(JwtAuthGuard)
  createQuestion(
    @Body() dto: { formId: number; type: string; title: string },
    @Req()
    request: { user: { id: number } },
  ) {
    return this.questionService.questionsCreate(
      dto.formId,
      dto.title,
      dto.type,
      request.user.id,
    );
  }

  @Post('/update')
  @UseGuards(JwtAuthGuard)
  updateQuestion(@Body() dto: { formId: number; title: string }) {
    return this.questionService.updateQuestions(dto.formId, dto.title);
  }

  @Delete('/delete')
  @UseGuards(JwtAuthGuard)
  deleteQuestion(@Body() dto: { questionId: number }) {
    return this.questionService.deleteQuestions(dto.questionId);
  }
}
