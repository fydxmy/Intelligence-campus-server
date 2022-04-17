'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const koa_router_1 = __importDefault(require('koa-router'));
const indexController_1 = __importDefault(require('../controller/indexController'));
const router = new koa_router_1.default();
router.prefix('/user');
// @ts-ignore
router.get('/', indexController_1.default.register);
exports.default = router;
