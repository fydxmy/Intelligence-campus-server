import { Context, DefaultState } from 'koa';
import path from 'path';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import koaRouter from 'koa-router';
import multer from 'koa-multer';

const uploadSingleFileRouter = new koaRouter<DefaultState, Context>({ prefix: '/upload' });

uploadSingleFileRouter.post('/uploadSingleFile', multer().single(), (ctx: Context) => {
  try {
    const file = ctx.request.files.file;
    // @ts-ignore
    const fileType = ctx.request.body.fileType;
    // 创建可读流
    // @ts-ignore
    const reader = fs.createReadStream(file.path);
    // 获取文件后缀名
    // @ts-ignore
    const extname = path.extname(file.name);
    // 重新生产文件名
    const fileName = uuidv4() + extname;
    const relativePath = `../public/images/${fileType}/${fileName}`;
    // 图片存储的路径
    // @ts-ignore
    const filePath = path.join(__dirname, relativePath);
    console.log(filePath);
    // 创建可写流
    const upStream = fs.createWriteStream(filePath);
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
export default uploadSingleFileRouter;
