import { DefaultState, Context } from 'koa';
import koaRouter from 'koa-router';
import collegeController from '../controller/college';

const router = new koaRouter<DefaultState, Context>({ prefix: '/college' });
router.get('/queryCollege', collegeController.queryCollege);
export default router;
