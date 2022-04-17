import { Sequelize } from 'sequelize';
import config from '../config';
const { database, user, password, options } = config.mysql;
const mysqlConnect = new Sequelize(database, user, password, {
  host: options.host,
  port: options.port,
  dialect: 'mysql',
  pool: {
    max: 10, // 连接池钟最大的连接数量
    min: 0, // 最小
    idle: 10000, // 如果一个连接池 10s 之内没有被使用，则释放
  },
});

export default mysqlConnect;
