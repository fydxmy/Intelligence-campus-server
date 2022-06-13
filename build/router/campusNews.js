'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const koa_router_1 = __importDefault(require('koa-router'));
const getCampusNews_1 = __importDefault(require('../controller/campusNews/getCampusNews'));
const queryCampusNews_1 = __importDefault(require('../controller/campusNews/queryCampusNews'));
const campusNewsRouter = new koa_router_1.default({ prefix: '/campusNews' });
campusNewsRouter.post('/getCampusNews', getCampusNews_1.default);
campusNewsRouter.get('/queryCampusNews', queryCampusNews_1.default);
exports.default = campusNewsRouter;
