import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Table,
  Model,
} from 'sequelize-typescript';
import { Questions } from '../../questions/model/Questions.model';

interface VariantCreationAttrs {
  title: string;
  questionId: number;
}

@Table({ tableName: 'variant', updatedAt: false })
export class Variant extends Model<Variant, VariantCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  title: string;

  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  correct: boolean;

  @Column({ type: DataType.INTEGER, allowNull: false })
  @ForeignKey(() => Questions)
  questionId: number;

  @BelongsTo(() => Questions)
  question: Questions;
}
