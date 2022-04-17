import { DefaultState, Context } from 'koa';
import koaRouter from 'koa-router';

const router = new koaRouter<DefaultState, Context>({ prefix: '/college' });
router.post('/queryCollege', );
export default router;
