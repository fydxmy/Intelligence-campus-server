'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const koa_1 = __importDefault(require('koa'));
const mysql_1 = __importDefault(require('./db/mysql'));
const sendMiddleWarte_1 = __importDefault(require('./middlewares/sendMiddleWarte'));
const userRouter_1 = __importDefault(require('./router/userRouter'));
const koa_static_1 = __importDefault(require('koa-static'));
const koa_json_1 = __importDefault(require('koa-json'));
const koa_body_1 = __importDefault(require('koa-body'));
const config_1 = __importDefault(require('./config'));
/**
 * 实例化 dotenv
 * 会自动的去读取 .env 这个文件，然后添加到 process.env
 */
const app = new koa_1.default();
app.use((0, koa_static_1.default)(__dirname + '/public'));
/**
 * 数据格式化
 */
app.use((0, koa_body_1.default)());
app.use((0, koa_json_1.default)());
/**
 * 连接mysql数据库
 */
mysql_1.default
  .authenticate()
  .then(() => {
    console.log('数据连接成功');
  })
  .catch(() => {
    console.log('数据库连接失败');
  });
/** 统一接口返回 */
app.use(sendMiddleWarte_1.default);
/**
 * 路由注册
 */
app.use(userRouter_1.default.routes());
exports.default = app;
if (config_1.default) {
  app.listen(config_1.default.server.port, () => {
    // @ts-ignore
    console.log(`服务启动成功，端口号${config_1.default.server.port}`);
  });
}
