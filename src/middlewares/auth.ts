import Jwt from 'jsonwebtoken';
import Koa from 'koa';
import config from '../config';
declare module 'koa' {
  interface Request extends Koa.BaseRequest {
    auth: {
      studentId: string;
    };
  }
}

export default function auth() {
  return async (ctx: Koa.Context, next: Koa.Next) => {
    const token = ctx.request.get('Authorization');
    if (token) {
      await Jwt.verify(token, config.jwtKey.publicKey, async (err, data: { studentId: string }) => {
        if (err) {
          ctx.status = 401;
          ctx.sendSuccess({}, 'token错误，身份验证失败', -1);
        } else {
          ctx.request.auth = data;
          await next();
        }
      });
    } else {
      ctx.status = 401;
      ctx.sendSuccess({}, '没有token, 身份验证失败', -1);
    }
  };
}
