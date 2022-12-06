import { InjectModel } from '@nestjs/sequelize';
import { Forms } from './model/Forms.model';
import { HttpException, HttpStatus } from '@nestjs/common';
import { Questions } from '../questions/model/Questions.model';
import { Variant } from '../variant/model/Variant.model';
import { Reply } from '../answers/model/Reply.model';
import { Answers } from '../answers/model/Answers.model';
import { Op } from 'sequelize';
import { User } from '../user/model/User.model';
import { Subdivision } from '../subdivision/model/Subdivision.model';
import { UserService } from '../user/user.service';
import { MailerService } from '@nestjs-modules/mailer';

export class FormsService {
  constructor(
    @InjectModel(Forms) private formsRepo: typeof Forms,
    private userService: UserService,
    private mailService: MailerService,
  ) {}

  async getForms(role: string) {
    if (role === 'HR') {
      return await this.formsRepo.findAll({});
    }
    return await this.formsRepo.findAll({
      where: {
        [Op.and]: {
          date: {
            [Op.gt]: new Date(),
          },
          published: true,
        },
      },
    });
  }

  async getFormById(formId: number) {
    try {
      return await this.formsRepo.findByPk(formId, {
        include: [
          {
            model: Questions,
            required: false,
            include: [Variant],
          },
          {
            model: Reply,
            required: false,
            where: {
              draft: false,
            },
            include: [
              {
                model: Answers,
                required: false,
              },
              {
                model: User,
                attributes: { exclude: ['password'] },
                include: [{ model: Subdivision, attributes: ['name'] }],
              },
            ],
          },
        ],
        order: [
          ['questions', 'id'],
          ['questions', 'variants', 'id'],
          ['reply', 'answers', 'id'],
        ],
      });
    } catch (e) {
      throw new HttpException('Неправильный запрос', HttpStatus.BAD_REQUEST);
    }
  }

  async formsCreate(userId: number, title: string) {
    return await this.formsRepo.create({ userId, title });
  }

  async updateForm(formId: number, title: string, date: string) {
    try {
      const form = await this.formsRepo.findByPk(formId);
      form.title = title;
      form.date = date;
      await form.save();
      return form;
    } catch (e) {
      throw new HttpException('Неправильный запрос', HttpStatus.BAD_REQUEST);
    }
  }

  async toPublishForm(role: string, formId: number) {
    try {
      if (role === 'HR') {
        const form = await this.formsRepo.findOne({
          where: { id: formId },
          include: [
            {
              model: Questions,
              required: false,
              include: [Variant],
            },
            {
              model: Reply,
              required: false,
              where: {
                draft: false,
              },
              include: [
                {
                  model: Answers,
                  required: false,
                },
                {
                  model: User,
                  attributes: { exclude: ['password'] },
                  include: [{ model: Subdivision, attributes: ['name'] }],
                },
              ],
            },
          ],
          order: [
            ['questions', 'id'],
            ['questions', 'variants', 'id'],
            ['reply', 'answers', 'id'],
          ],
        });
        form.published = !form.published;
        await form.save();
        if (form.published) {
          const users = await this.userService.findEmployee();
          users.forEach((user) => {
            this.mailService.sendMail({
              to: user.email,
              from: 'kolyirb1s@gmail.com',
              subject: '',
              text: 'Появились новые опросы',
            });
          });
        }
        return form;
      }
      return new HttpException('Нет доступа', HttpStatus.FORBIDDEN);
    } catch (e) {
      throw new HttpException(e, HttpStatus.BAD_REQUEST);
    }
  }

  async deleteForm(role: string, formId: number) {
    try {
      if (role === 'HR') {
        const form = await this.formsRepo.findByPk(formId);
        await form.destroy();
        return new HttpException('Форма удалена', HttpStatus.OK);
      }
      return new HttpException('Нет доступа', HttpStatus.FORBIDDEN);
    } catch (e) {
      throw new HttpException(e, HttpStatus.BAD_REQUEST);
    }
  }
}
