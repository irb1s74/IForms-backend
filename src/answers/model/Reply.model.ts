import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Table,
  Model,
  HasMany,
} from 'sequelize-typescript';
import { Forms } from '../../forms/model/Forms.model';
import { User } from '../../user/model/User.model';
import { Answers } from './Answers.model';

interface ReplyCreationAttrs {
  formId: number;
  userId: number;
}

@Table({ tableName: 'reply', updatedAt: false })
export class Reply extends Model<Reply, ReplyCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.INTEGER, allowNull: false })
  @ForeignKey(() => Forms)
  formId: number;

  @Column({ type: DataType.INTEGER, allowNull: false })
  @ForeignKey(() => User)
  userId: number;

  @Column({ type: DataType.BOOLEAN, defaultValue: true })
  draft: boolean;

  @BelongsTo(() => Forms)
  form: Forms;

  @BelongsTo(() => User)
  user: User;

  @HasMany(() => Answers)
  answers: Answers[];
}
