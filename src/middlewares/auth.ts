import Jwt from 'jsonwebtoken';
import Koa from 'koa';
import config from '../config';
declare module 'koa' {
  interface Request extends Koa.BaseRequest {
    auth: {
      studentID: number;
    };
  }
}

export default function auth() {
  (ctx: Koa.Context, next: Koa.Next) => {
    const token = ctx.request.get('Authorization');
    if (token) {
      Jwt.verify(token, config.jwtKey.privateKey, async (err, data: { studentID: number }) => {
        if (err) {
          ctx.status = 401;
          ctx.sendSuccess({}, 'token错误，身份验证失败', -1);
        } else {
          ctx.request.auth = data;
          next();
        }
      });
    } else {
      ctx.status = 401;
      ctx.sendSuccess({}, '没有token, 身份验证失败', -1);
    }
  };
}
