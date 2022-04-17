'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
class IndexController {
  async register(ctx) {
    const { studentID, passWord } = ctx.request.body;
    ctx.sendSuccess({});
  }
}
exports.default = new IndexController();
