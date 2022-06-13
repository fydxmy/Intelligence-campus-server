'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const koa_router_1 = __importDefault(require('koa-router'));
const class_1 = require('../controller/class');
const auth_1 = __importDefault(require('../middlewares/auth'));
const router = new koa_router_1.default({ prefix: '/class' });
router.get('/queryClass', (0, auth_1.default)(), class_1.queryClass);
// router.post('/login', addClass);
// router.allowedMethods();
exports.default = router;
