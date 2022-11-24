import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Table,
  Model,
} from 'sequelize-typescript';
import { Reply } from './Reply.model';
import { Questions } from '../../questions/model/Questions.model';

export interface AnswersCreationAttrs {
  questionId: number;
  replyId: number;
  title: string;
}

@Table({ tableName: 'answers', updatedAt: false })
export class Answers extends Model<Answers, AnswersCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  title: string;

  @Column({ type: DataType.INTEGER, allowNull: false })
  @ForeignKey(() => Reply)
  replyId: number;

  @Column({ type: DataType.INTEGER, allowNull: false })
  @ForeignKey(() => Questions)
  questionId: number;

  @BelongsTo(() => Reply)
  reply: Reply;

  @BelongsTo(() => Questions)
  questions: Questions;
}
