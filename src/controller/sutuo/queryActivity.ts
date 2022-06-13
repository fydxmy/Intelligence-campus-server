import { Context } from 'koa';
import { executeSQL } from '../../db/mysql';
import { ObjToStrQuote } from '../../utils';

export async function queryActivity(ctx: Context) {
  let {
    pageNumber = 1,
    pageSize = 10,
    stStatus,
  } = ctx.query as unknown as {
    pageNumber: number;
    pageSize: number;
    stStatus: number;
  };
  pageNumber = Number(pageNumber);
  pageSize = Number(pageSize);
  stStatus = Number(stStatus);
  try {
    let ListSqlWhere = '';
    if (stStatus) {
      ListSqlWhere = `WHERE ${ObjToStrQuote({ stStatus })}`;
    }
    const ListSql = `SELECT * FROM sutuo_activity ${ListSqlWhere} LIMIT ${(pageNumber - 1) * pageSize}, ${pageSize}`;
    console.log(ListSql);
    const list = await executeSQL(ListSql, 'sutuo_activity');
    const totalSql = `SELECT COUNT(id) FROM sutuo_activity;`;
    const total = await executeSQL(totalSql, 'sutuo_activity');
    ctx.sendSuccess({
      list,
      total: total[0]['COUNT(id)'],
    });
  } catch (error) {
    ctx.sendError(null);
  }
}
