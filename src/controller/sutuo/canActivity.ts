import Koa from 'koa';
import { currentDate, ObjStr } from '../../utils';
import { executeSQL } from '../../db/mysql';

export default async function canActivity(ctx: Koa.Context) {
  const { title, grade, state, activityId } = ctx.request.body as {
    title: string;
    grade: number;
    state: number;
    activityId: number;
  };
  const { phoneNumber, studentId } = ctx.request.auth;
  const sql = `INSERT INTO sutuo_grade (title,phoneNumber,studentId,grade,state,activityId, createdAt) values (${ObjStr(
    {
      title,
      phoneNumber,
      studentId,
      grade,
      state,
      activityId,
      createdAt: currentDate,
    }
  )})`;
  try {
    const res = await executeSQL(sql, 'sutuo_activity');
    if (res) {
      ctx.sendSuccess({});
    } else {
      ctx.sendError(null);
    }
  } catch (error) {
    console.log(error);
    ctx.sendError(error);
  }
}
