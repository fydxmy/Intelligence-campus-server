'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const path_1 = __importDefault(require('path'));
const fs_1 = __importDefault(require('fs'));
const uuid_1 = require('uuid');
const koa_router_1 = __importDefault(require('koa-router'));
const koa_multer_1 = __importDefault(require('koa-multer'));
const uploadSingleFileRouter = new koa_router_1.default({ prefix: '/upload' });
uploadSingleFileRouter.post('/uploadSingleFile', (0, koa_multer_1.default)().single(), (ctx) => {
  try {
    const file = ctx.request.files.file;
    // @ts-ignore
    const fileType = ctx.request.body.fileType;
    // 创建可读流
    // @ts-ignore
    const reader = fs_1.default.createReadStream(file.path);
    // 获取文件后缀名
    // @ts-ignore
    const extname = path_1.default.extname(file.name);
    // 重新生产文件名
    const fileName = (0, uuid_1.v4)() + extname;
    const relativePath = `../public/images/${fileType}/${fileName}`;
    // 图片存储的路径
    // @ts-ignore
    const filePath = path_1.default.join(__dirname, relativePath);
    console.log(filePath);
    // 创建可写流
    const upStream = fs_1.default.createWriteStream(filePath);
    // 可读流通过管道写入可写流
    reader.pipe(upStream);
    ctx.sendSuccess(
      {
        uri: `images/${fileType}/${fileName}`,
      },
      '上传成功'
    );
  } catch (error) {
    ctx.status = 400;
    ctx.sendError('上传失败');
  }
});
exports.default = uploadSingleFileRouter;
