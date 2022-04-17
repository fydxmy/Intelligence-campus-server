'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
/**
 * 统一接口返回处理
 */
function SendMiddleWarte(ctx, next) {
  /**
   * 请求成功处理函数
   * @param code 状态码
   * @param message 响应信息
   * @param data 响应数据
   */
  ctx.sendSuccess = (data, code = 0, message = '请求成功') => {
    ctx.body = {
      code,
      message,
      ...data,
    };
  };
  /**
   * 请求失败处理函数
   * @param code 状态码
   * @param message 响应信息
   * @param data 响应数据
   */
  ctx.sendError = (data, code = -1, message = '请求失败') => {
    ctx.body = {
      code,
      message,
      ...data,
    };
  };
  next();
}
exports.default = SendMiddleWarte;
