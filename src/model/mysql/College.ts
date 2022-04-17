import { Model, Optional, DataTypes } from 'sequelize';
import mysqlConnect from '../../db/mysql';

interface CollegeAttributes {
  id: number; // 编号
  collegeNumber: string; // 分院名称
  dean: string; // 院长
  createdAt: string;
  updatedAt: string;
}
// 创建 User 模型。 数据表的名字是users
export const College = mysqlConnect.define<
  Model<CollegeAttributes, Optional<CollegeAttributes, 'id'>> & CollegeAttributes
>('college', {
  // id 会自动创建，并且设为主键、自增
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  collegeNumber: {
    type: DataTypes.STRING,
    unique: true,
  },
  dean: {
    type: DataTypes.STRING,
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
