'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const koa_router_1 = __importDefault(require('koa-router'));
// import collegeController from '../controller/college';
const router = new koa_router_1.default({ prefix: '/college' });
// router.get('/queryCollege', collegeController.queryCollege);
exports.default = router;
