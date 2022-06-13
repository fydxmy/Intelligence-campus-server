import Koa from 'koa';
import { ObjToStrQuoteWhere } from '../../utils';
import { executeSQL } from '../../db/mysql';

export default async function queryActivityGrade(ctx: Koa.Context) {
  const { activityId } = ctx.request.body as {
    activityId: number;
  };
  const { phoneNumber } = ctx.request.auth;
  const sql = `SELECT * FROM sutuo_grade WHERE ${ObjToStrQuoteWhere({ activityId, phoneNumber })}`;
  try {
    const res = await executeSQL(sql, 'sutuo_grade');
    if (res) {
      ctx.sendSuccess({ list: res });
    } else {
      ctx.sendError(null);
    }
  } catch (error) {
    console.log(error);
    ctx.sendError(error);
  }
}
