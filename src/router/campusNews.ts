import { DefaultState, Context } from 'koa';
import koaRouter from 'koa-router';
import getCampusNews from '../controller/campusNews/getCampusNews';

const campusNewsRouter = new koaRouter<DefaultState, Context>({ prefix: '/campusNews' });

campusNewsRouter.post('/getCampusNews', getCampusNews);

export default campusNewsRouter;
