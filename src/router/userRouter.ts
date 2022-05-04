import { DefaultState, Context } from 'koa';
import koaRouter from 'koa-router';
import authController from '../controller/auth';
import { QueryStudentStatus } from '../controller/auth/QueryStudentStatus';
import { authTokenController, QueryUserInfo, updateUserInfo } from '../controller/auth/userInfo';
import auth from '../middlewares/auth';

const router = new koaRouter<DefaultState, Context>({ prefix: '/user' });

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/auth', auth(), authTokenController);
router.get('/queryStudentStatus', auth(), QueryStudentStatus);
router.get('/userinfo', auth(), QueryUserInfo);
router.post('/updateUserInfo', auth(), updateUserInfo);
export default router;
