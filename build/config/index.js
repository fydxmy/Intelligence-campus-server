'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const dotenv_1 = __importDefault(require('dotenv'));
dotenv_1.default.config();
const ENV = process.env.NODE_ENV;
console.log(`当前环境是：${process.env.NODE_ENV}`);
let config = undefined;
switch (ENV) {
  case 'dev':
    config = {
      server: {
        port: 8686,
      },
      mysql: {
        database: 'zs_campus',
        user: 'fydxmy',
        password: 'ABCxpy6630755@',
        options: {
          host: 'rm-bp17xikp4s6o14008mo.mysql.rds.aliyuncs.com',
          port: 3306,
        },
      },
      redis: {
        host: 'localhost',
        port: 6,
      },
      secretKey: {
        session: 'XMY_fydxmy123',
      },
    };
    break;
  default:
    break;
}
exports.default = config;
