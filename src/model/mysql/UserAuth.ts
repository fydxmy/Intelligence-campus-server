import { Model, Optional, DataTypes } from 'sequelize';
import mysqlConnect from '../../db/mysql';

interface UserAuthAttributes {
  id: number;
  studentId: string;
  phoneNumber: string;
  passWord: string;
  createdAt: string;
  updatedAt: string;
}
// 创建 User 模型。 数据表的名字是users
export const UserAuth = mysqlConnect.define<
  Model<UserAuthAttributes, Optional<UserAuthAttributes, 'id'>> & UserAuthAttributes
>('user-auth', {
  // id 会自动创建，并且设为主键、自增
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  studentId: {
    type: DataTypes.STRING,
    unique: true,
  },
  phoneNumber: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  passWord: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});
