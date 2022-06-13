'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const koa_1 = __importDefault(require('koa'));
const sendMiddleWarte_1 = __importDefault(require('./middlewares/sendMiddleWarte'));
const corsOptions_1 = __importDefault(require('./middlewares/corsOptions'));
const koa_static_1 = __importDefault(require('koa-static'));
const koa_body_1 = __importDefault(require('koa-body'));
const config_1 = __importDefault(require('./config'));
const koa_logger_1 = __importDefault(require('koa-logger'));
const classRouter_1 = __importDefault(require('./router/classRouter'));
const userRouter_1 = __importDefault(require('./router/userRouter'));
const campusNews_1 = __importDefault(require('./router/campusNews'));
const uploadSingleFileRouter_1 = __importDefault(require('./router/uploadSingleFileRouter'));
const sutuoRouter_1 = __importDefault(require('./router/sutuoRouter'));
/**
 * 实例化 dotenv
 * 会自动的去读取 .env 这个文件，然后添加到 process.env
 */
const app = new koa_1.default();
/**
 * 解决跨域请求和options请求
 */
app.use((0, corsOptions_1.default)());
/**
 * 连接mysql数据库
 */
app.use((0, sendMiddleWarte_1.default)()); // 统一接口返回
app.use((0, koa_logger_1.default)());
// koa-body 是一个可以帮助解析 http 中 body 的部分的中间件，包括 json、表单、文本、文件等。
app.use(
  (0, koa_body_1.default)({
    multipart: true,
    formidable: {
      maxFileSize: 2 * 1024 * 1024, // 设置上传文件大小最大限制，默认2M
      //uploadDir: 可以填写一个路径，不填写默认为 os.tmpDir()
    },
  })
);
/**
 * 路由注册
 */
app.use(userRouter_1.default.routes());
app.use(classRouter_1.default.routes());
app.use(campusNews_1.default.routes());
app.use(uploadSingleFileRouter_1.default.routes());
app.use(sutuoRouter_1.default.routes());
app.use((0, koa_static_1.default)(__dirname + '/public'));
if (config_1.default) {
  app.listen(config_1.default.server.port, function () {
    console.log(`服务启动成功，端口号${config_1.default.server.port}`);
  });
}
// export default app;
