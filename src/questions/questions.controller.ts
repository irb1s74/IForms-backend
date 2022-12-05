import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { QuestionsService } from './questions.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Request } from 'express';

@Controller('questions')
export class QuestionsController {
  constructor(private questionService: QuestionsService) {}

  @Post('/create')
  @UseGuards(JwtAuthGuard)
  createQuestion(
    @Body() dto: { formId: number; type: string; title: string },
    @Req()
    @Req()
    request: { user: { id: number; role: string } },
  ) {
    return this.questionService.questionsCreate(
      dto.formId,
      dto.title,
      dto.type,
      request.user.role,
    );
  }

  @Post('/update')
  @UseGuards(JwtAuthGuard)
  updateQuestion(
    @Body()
    dto: {
      questionId: number;
      title: string;
      type: string;
      required: boolean;
    },
  ) {
    return this.questionService.updateQuestions(dto);
  }

  @Post('/image')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('image'))
  updateImage(
    @UploadedFile() image,
    @Body()
    dto: {
      questionId: number;
    },
  ) {
    return this.questionService.updateImageQuestion(dto.questionId, image);
  }

  @Delete('/delete/:id')
  @UseGuards(JwtAuthGuard)
  deleteQuestion(
    @Req() request: { user: { id: number; role: string } },
    @Param('id') questionId,
  ) {
    return this.questionService.deleteQuestions(request.user.role, questionId);
  }
}
