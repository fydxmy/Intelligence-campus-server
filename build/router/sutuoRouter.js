'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const koa_router_1 = __importDefault(require('koa-router'));
const auditActivity_1 = __importDefault(require('../controller/sutuo/auditActivity'));
const canActivity_1 = __importDefault(require('../controller/sutuo/canActivity'));
const createActivity_1 = __importDefault(require('../controller/sutuo/createActivity'));
const queryActivity_1 = require('../controller/sutuo/queryActivity');
const queryActivityGrade_1 = __importDefault(require('../controller/sutuo/queryActivityGrade'));
const auth_1 = __importDefault(require('../middlewares/auth'));
const sutuoRouter = new koa_router_1.default({ prefix: '/sutuo' });
sutuoRouter.post('/createActivity', (0, auth_1.default)(), createActivity_1.default);
sutuoRouter.post('/auditActivity', (0, auth_1.default)(), auditActivity_1.default);
sutuoRouter.get('/queryActivity', (0, auth_1.default)(), queryActivity_1.queryActivity);
sutuoRouter.post('/canActivity', (0, auth_1.default)(), canActivity_1.default);
sutuoRouter.post('/queryActivityGrade', (0, auth_1.default)(), queryActivityGrade_1.default);
exports.default = sutuoRouter;
