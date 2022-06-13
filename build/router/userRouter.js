'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const koa_router_1 = __importDefault(require('koa-router'));
const auth_1 = __importDefault(require('../controller/auth'));
const QueryStudentStatus_1 = require('../controller/auth/QueryStudentStatus');
const userInfo_1 = require('../controller/auth/userInfo');
const auth_2 = __importDefault(require('../middlewares/auth'));
const router = new koa_router_1.default({ prefix: '/user' });
router.post('/register', auth_1.default.register);
router.post('/login', auth_1.default.login);
router.post('/auth', (0, auth_2.default)(), userInfo_1.authTokenController);
router.get('/queryStudentStatus', (0, auth_2.default)(), QueryStudentStatus_1.QueryStudentStatus);
router.get('/userinfo', (0, auth_2.default)(), userInfo_1.QueryUserInfo);
router.post('/updateUserInfo', (0, auth_2.default)(), userInfo_1.updateUserInfo);
exports.default = router;
