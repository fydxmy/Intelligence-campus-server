import { Model, Optional, DataTypes } from 'sequelize';
import mysqlConnect from '../../db/mysql';
import { Class } from './Class';
import { College } from './college';
interface UserInfoAttributes {
  id: number;
  studentId: string;
  phoneNumber: string;
  name: string; // 姓名
  gender: number; // 性别
  nativePlace: string; // 籍贯
  identityNumber: string; // 身份证
  dormitory: string; // 宿舍
  collegeId: string; // 分院
  classId: number; // 班级
  createdAt: string;
  updatedAt: string;
}
export const UserInfo = mysqlConnect.define<
  Model<UserInfoAttributes, Optional<UserInfoAttributes, 'id'>> & UserInfoAttributes
>('user-info', {
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
  name: {
    type: DataTypes.STRING,
  },
  gender: {
    type: DataTypes.TINYINT,
  },
  nativePlace: {
    type: DataTypes.STRING,
  },
  identityNumber: {
    type: DataTypes.STRING,
  },
  dormitory: {
    type: DataTypes.STRING,
  },
  collegeId: {
    type: DataTypes.INTEGER,
  },
  classId: {
    type: DataTypes.INTEGER,
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
UserInfo.hasMany(Class, { foreignKey: 'classId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
UserInfo.hasMany(College, { foreignKey: 'collegeId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });

UserInfo.sync({ force: false }).then(() => {
  console.log('sync ok');
});
