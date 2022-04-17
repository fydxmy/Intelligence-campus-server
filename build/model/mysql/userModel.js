'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const sequelize_1 = __importDefault(require('sequelize'));
const mysql_1 = __importDefault(require('../../db/mysql'));
// 创建 User 模型。 数据表的名字是users
const User = mysql_1.default.define('user', {
  // id 会自动创建，并且设为主键、自增
  userName: {
    type: sequelize_1.default.STRING,
    allowNull: false,
  },
  passWord: {
    type: sequelize_1.default.STRING,
    allowNull: false,
  },
  nickName: {
    type: sequelize_1.default.STRING,
    comment: '昵称', // comment 是注释
  },
});
// 创建Blog 模型
const Blog = mysql_1.default.define('blog', {
  title: {
    type: sequelize_1.default.STRING,
    allowNull: false,
  },
  content: {
    type: sequelize_1.default.STRING,
    allowNull: false,
  },
  userId: {
    type: sequelize_1.default.INTEGER,
    allowNull: false,
  },
});
// 外键关联
Blog.belongsTo(User, {
  // 创建外键 Blog.userId -> User.id
  foreignKey: 'userId',
});
exports.default = {
  User,
  Blog,
};
