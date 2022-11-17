import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { resolve, join } from 'path';
import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { v4 } from 'uuid';

@Injectable()
export class FileService {
  async createFile(file: any, folder: string): Promise<string> {
    try {
      const fileName = v4() + '.jpg';
      const filePath = resolve(__dirname, '..', `static/${folder}`);
      if (!existsSync(filePath)) {
        mkdirSync(filePath, { recursive: true });
      }
      writeFileSync(join(filePath, fileName), file.buffer);
      return fileName;
    } catch (e) {
      throw new HttpException(
        'Произошла ошибка',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
