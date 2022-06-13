'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const jsonwebtoken_1 = __importDefault(require('jsonwebtoken'));
const config_1 = __importDefault(require('../config'));
function auth() {
  return async (ctx, next) => {
    const token = ctx.request.get('Authorization');
    if (token) {
      await jsonwebtoken_1.default.verify(token, config_1.default.jwtKey.publicKey, async (err, data) => {
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
exports.default = auth;
