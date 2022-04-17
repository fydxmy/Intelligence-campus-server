import { Model, Optional, DataTypes } from 'sequelize';
import mysqlConnect from '../../db/mysql';
import { College } from './college';

interface ClassAttributes {
  id: number; // 编号
  classNumber: string; // 班级名称
  grade: number;
  collegeId: number; // 分院编号
  specialtyName: string; // 专业名称
  createdAt: string;
  updatedAt: string;
}
export const Class = mysqlConnect.define<Model<ClassAttributes, Optional<ClassAttributes, 'id'>> & ClassAttributes>(
  'class',
  {
    // id 会自动创建，并且设为主键、自增
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    classNumber: {
      type: DataTypes.STRING,
      unique: true,
    },
    specialtyName: {
      type: DataTypes.STRING,
      unique: true,
    },
    grade: {
      type: DataTypes.INTEGER,
      unique: true,
    },
    collegeId: {
      type: DataTypes.INTEGER,
      unique: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  }
);

Class.hasMany(College, { foreignKey: 'collegeId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });

// Class.sync({ force: false }).then(() => {
//   console.log('sync ok');
// });
