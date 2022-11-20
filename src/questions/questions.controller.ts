import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
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
  updateQuestion(
    @Body()
    dto: {
      formId: number;
      title: string;
      type: string;
      required: boolean;
    },
  ) {
    return this.questionService.updateQuestions(dto);
  }

  @Delete('/delete/:id')
  @UseGuards(JwtAuthGuard)
  deleteQuestion(
    @Req() request: { user: { id: number } },
    @Param('id') questionId,
  ) {
    return this.questionService.deleteQuestions(request.user.id, questionId);
  }
}
