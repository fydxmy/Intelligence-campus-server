import Koa from 'koa';
import mysql from './db/mysql';
import SendMiddleWarte from './middlewares/sendMiddleWarte';
import CorsOptions from './middlewares/corsOptions';
import userRouter from './router/userRouter';
import classRouter from './router/classRouter';
import koaStatic from 'koa-static';
import koaBody from 'koa-body';
import config from './config';
import koaLogger from 'koa-logger';

/**
 * 实例化 dotenv
 * 会自动的去读取 .env 这个文件，然后添加到 process.env
 */
const app = new Koa();

/**
 * 解决跨域请求和options请求
 */
app.use(CorsOptions());
/**
 * 连接mysql数据库
 */
mysql
  .authenticate()
  .then(() => {
    console.log('数据连接成功');
  })
  .catch(() => {
    console.log('数据库连接失败');
  });
// 执行同步
// mysql.sync({ force: false }).then(() => {
//   console.log('sync ok');
// });

app.use(SendMiddleWarte()); // 统一接口返回
app.use(koaLogger());

// koa-body 是一个可以帮助解析 http 中 body 的部分的中间件，包括 json、表单、文本、文件等。
app.use(
  koaBody({
    multipart: true, //解析多个文件
    formidable: {
      maxFileSize: 2 * 1024 * 1024, // 设置上传文件大小最大限制，默认2M
      //uploadDir: 可以填写一个路径，不填写默认为 os.tmpDir()
    },
  })
);

/**
 * 路由注册
 */
app.use(userRouter.routes());
app.use(classRouter.routes());
app.use(koaStatic(__dirname + '../public'));
if (config) {
  app.listen(config.server.port, () => {
    // @ts-ignore
    console.log(`服务启动成功，端口号${config.server.port}`);
  });
}
// export default app;
