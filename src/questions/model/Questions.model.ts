import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Table,
  Model,
} from 'sequelize-typescript';
import { Forms } from '../../forms/model/Forms.model';

interface QuestionsCreationAttrs {
  formId: number;
  type: string;
}

@Table({ tableName: 'questions', updatedAt: false })
export class Questions extends Model<Questions, QuestionsCreationAttrs> {
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

  @Column({ type: DataType.STRING, allowNull: true })
  title: string;

  @Column({ type: DataType.STRING, allowNull: false })
  type: string;

  @Column({ type: DataType.BOOLEAN, allowNull: true })
  correct: boolean;

  @Column({ type: DataType.TEXT, allowNull: true })
  answer: string;

  @BelongsTo(() => Forms)
  form: Forms;
}
