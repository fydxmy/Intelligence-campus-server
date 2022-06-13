import { DefaultState, Context } from 'koa';
import koaRouter from 'koa-router';
import auditActivity from '../controller/sutuo/auditActivity';
import canActivity from '../controller/sutuo/canActivity';
import createActivity from '../controller/sutuo/createActivity';
import { queryActivity } from '../controller/sutuo/queryActivity';
import queryActivityGrade from '../controller/sutuo/queryActivityGrade';
import auth from '../middlewares/auth';

const sutuoRouter = new koaRouter<DefaultState, Context>({ prefix: '/sutuo' });

sutuoRouter.post('/createActivity', auth(), createActivity);
sutuoRouter.post('/auditActivity', auth(), auditActivity);
sutuoRouter.get('/queryActivity', auth(), queryActivity);
sutuoRouter.post('/canActivity', auth(), canActivity);
sutuoRouter.post('/queryActivityGrade', auth(), queryActivityGrade);
export default sutuoRouter;
