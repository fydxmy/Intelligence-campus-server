import Koa, { Context, Next } from 'koa';

export type SendDataType = (data: any, message?: string, code?: number) => void;

declare module 'koa' {
  interface Context extends Koa.ParameterizedContext {
    sendSuccess: SendDataType;
    sendError: SendDataType;
  }
}

/**
 * 统一接口返回处理
 */
export default function SendMiddleWarte() {
  return async (ctx: Context, next: Next) => {
    /**
     * 请求失败处理函数
     * @param code 状态码
     * @param message 响应信息
     * @param data 响应数据
     */
    ctx.sendError = (data, message = 'error', code = -1) => {
      ctx.status = 400;
      ctx.body = {
        code,
        message,
        data,
      };
    };
    /**
     * 请求成功处理函数
     * @param code 状态码
     * @param message 响应信息
     * @param data 响应数据
     */
    ctx.sendSuccess = (data, message = 'success', code = 0) => {
      ctx.body = {
        code,
        message,
        data,
      };
    };
    await next();
  };
}
