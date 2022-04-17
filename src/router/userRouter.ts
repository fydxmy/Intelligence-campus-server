import { DefaultState, Context } from 'koa';
import koaRouter from 'koa-router';
import indexController from '../controller/auth';
// import auth from '../middlewares/auth';

const router = new koaRouter<DefaultState, Context>({ prefix: '/user' });
// router.prefix('/user');

router.post('/register', indexController.register);
router.post('/login', indexController.login);
// router.allowedMethods();
export default router;
