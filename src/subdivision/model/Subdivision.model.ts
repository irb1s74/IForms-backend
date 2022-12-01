import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { User } from '../../user/model/User.model';

interface SubdivisionCreationAttrs {
  name: string;
}

@Table({ tableName: 'subdivision', updatedAt: false })
export class Subdivision extends Model<Subdivision, SubdivisionCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  name: string;

  @HasMany(() => User)
  users: User[];
}
