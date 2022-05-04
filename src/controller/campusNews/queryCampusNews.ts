import Koa from 'koa';
import { executeSQL } from '../../db/mysql';

export default async function queryCampusNews(ctx: Koa.Context) {
  const {
    type,
    pageSize = 10,
    pageNumber = 1,
  } = ctx.query as Partial<{ type: string; pageSize: number; pageNumber: number }>;
  try {
    // eslint-disable-next-line prettier/prettier
    const listSql = `select * from jg_news ${type ? `where type="${type}"` : ''} order by dateTime desc limit ${
      (pageNumber - 1) * pageSize
    }, ${pageSize}`;
    console.log(listSql);
    const list = await executeSQL(listSql, 'jg_news');
    const totalSql = `select count(*) as sum from jg_news ${type ? `where type="${type}"` : ''}`;
    console.log(totalSql);

    const total = await executeSQL(totalSql, 'jg_news');
    return ctx.sendSuccess({ list, total: total[0].sum });
  } catch (error) {
    ctx.sendError(null);
  }
}
