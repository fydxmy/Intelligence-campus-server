import { DefaultState, Context } from 'koa';
import koaRouter from 'koa-router';
import { queryClass } from '../controller/class';
import auth from '../middlewares/auth';

const router = new koaRouter<DefaultState, Context>({ prefix: '/class' });

router.get('/queryClass', auth(), queryClass);
// router.post('/login', addClass);
// router.allowedMethods();
export default router;
