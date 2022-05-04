import { DefaultState, Context } from 'koa';
import koaRouter from 'koa-router';
import getCampusNews from '../controller/campusNews/getCampusNews';
import queryCampusNews from '../controller/campusNews/queryCampusNews';

const campusNewsRouter = new koaRouter<DefaultState, Context>({ prefix: '/campusNews' });

campusNewsRouter.post('/getCampusNews', getCampusNews);
campusNewsRouter.get('/queryCampusNews', queryCampusNews);

export default campusNewsRouter;
