import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { Reply } from '../../answers/model/Reply.model';
import { Subdivision } from '../../subdivision/model/Subdivision.model';

interface UserCreationAttrs {
  email: string;
  full_name: string;
  nickname: string;
}

@Table({ tableName: 'user', updatedAt: false })
export class User extends Model<User, UserCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  email: string;

  @Column({ type: DataType.STRING, allowNull: true })
  full_name: string;

  @Column({ type: DataType.STRING, allowNull: false })
  password: string;

  @ForeignKey(() => Subdivision)
  @Column({ type: DataType.INTEGER, allowNull: false, defaultValue: 1 })
  subdivisionId: number;

  @Column({ type: DataType.STRING, allowNull: true })
  avatar: string;

  @Column({ type: DataType.STRING, defaultValue: 'employee' })
  role: string;

  @HasMany(() => Reply)
  reply: Reply[];

  @BelongsTo(() => Subdivision)
  subdivision: Subdivision;
}
