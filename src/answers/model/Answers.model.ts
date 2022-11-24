import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Table,
  Model,
} from 'sequelize-typescript';
import { Questions } from '../../questions/model/Questions.model';
import { User } from '../../user/model/User.model';

export interface AnswersCreationAttrs {
  questionId: number;
  userId: number;
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
  @ForeignKey(() => Questions)
  questionId: number;

  @Column({ type: DataType.INTEGER, allowNull: false })
  @ForeignKey(() => User)
  userId: number;

  @BelongsTo(() => Questions)
  question: Questions;

  @BelongsTo(() => User)
  user: User;
}
