import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface UsersCreationAttrs {
  email: string;
  nickname: string;
}

@Table({ tableName: 'user', updatedAt: false })
export class User extends Model<User, UsersCreationAttrs> {
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
  nickname: string;

  @Column({ type: DataType.STRING, allowNull: true })
  avatar: string;
}
