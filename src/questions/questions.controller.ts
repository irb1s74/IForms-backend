import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  Headers,
  HttpStatus,
  Param,
  Post,
  Req,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { QuestionsService } from './questions.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { createReadStream, statSync } from 'fs';
import { resolve } from 'path';

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

  @Post('/video')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('video'))
  updateVideo(
    @UploadedFile() video,
    @Body()
    dto: {
      questionId: number;
    },
  ) {
    return this.questionService.updateVideoQuestion(dto.questionId, video);
  }

  @Get('stream/:id')
  @Header('Accept-Ranges', 'bytes')
  @Header('Content-Type', 'video/mp4')
  async getStreamVideo(
    @Param('id') id: string,
    @Headers() headers,
    @Res() res: Response,
  ) {
    const videoPath = resolve(__dirname, '..', `static/questions/videos/${id}`);
    const { size } = statSync(videoPath);
    const videoRange = headers.range;
    if (videoRange) {
      const parts = videoRange.replace(/bytes=/, '').split('-');
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : size - 1;
      const chunksize = end - start + 1;
      const readStreamfile = createReadStream(videoPath, {
        start,
        end,
        highWaterMark: 60,
      });
      const head = {
        'Content-Range': `bytes ${start}-${end}/${size}`,
        'Content-Length': chunksize,
      };
      res.writeHead(HttpStatus.PARTIAL_CONTENT, head); //206
      readStreamfile.pipe(res);
    } else {
      const head = {
        'Content-Length': size,
      };
      res.writeHead(HttpStatus.OK, head); //200
      createReadStream(videoPath).pipe(res);
    }
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
