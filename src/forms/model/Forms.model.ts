import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Table,
  Model,
  HasMany,
} from 'sequelize-typescript';
import { User } from '../../user/model/User.model';
import { Questions } from '../../questions/model/Questions.model';
import { Reply } from '../../answers/model/Reply.model';

interface FormsCreationAttrs {
  title: string;
  userId: number;
}

@Table({ tableName: 'form', updatedAt: false })
export class Forms extends Model<Forms, FormsCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  title: string;

  @Column({ type: DataType.DATE, allowNull: true })
  date: string;

  @Column({ type: DataType.INTEGER, allowNull: false })
  @ForeignKey(() => User)
  userId: number;

  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  published: boolean;

  @BelongsTo(() => User)
  author: User;

  @HasMany(() => Questions)
  questions: Questions[];

  @HasMany(() => Reply)
  reply: Reply[];
}
