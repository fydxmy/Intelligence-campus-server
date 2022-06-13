'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
function corsOptions() {
  return async (ctx, next) => {
    ctx.set('Access-Control-Allow-Origin', '*');
    ctx.set('Access-Control-Allow-Headers', '*');
    ctx.set('Access-Control-Allow-Methods', '*');
    // "Access-Control-Max-Age"表明在1800秒内，不需要再发送预检验请求，可以缓存该结果
    ctx.set('Access-Control-Max-Age', '1800');
    if (ctx.method === 'OPTIONS') {
      ctx.body = null;
    } else {
      await next();
    }
  };
}
exports.default = corsOptions;
