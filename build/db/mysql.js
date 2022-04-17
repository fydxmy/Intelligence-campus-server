'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const sequelize_1 = require('sequelize');
const mysqlConnect = new sequelize_1.Sequelize('jxgcxy_app', 'fydxmy', 'ABCxpy6630755@', {
  host: 'rm-bp17xikp4s6o14008mo.mysql.rds.aliyuncs.com',
  port: 3306,
  dialect: 'mysql',
  pool: {
    max: 10,
    min: 0,
    idle: 10000, // 如果一个连接池 10s 之内没有被使用，则释放
  },
});
exports.default = mysqlConnect;
