import { Context } from 'koa';
import { getConn } from '../../db/mysql';
// import { Class } from '../../model/mysql/Class';
import { currentDate } from '../../utils';

type queryClassQueryType = {
  pageNumber: number;
  pageSize: number;
};
export async function queryClass(ctx: Context) {
  const { pageNumber = 1, pageSize = 10 } = ctx.query as unknown as queryClassQueryType;
  const conn = getConn('classes');
  try {
    const list = await new Promise((resolve, reject) => {
      const sql = `SELECT * FROM classes LIMIT ${(pageNumber - 1) * pageSize}0, ${pageSize}`;
      conn.query(sql, (err, data) => {
        if (err) {
          reject(err);
        }
        resolve(data);
      });
    });
    const total = await new Promise((resolve, reject) => {
      const sql = `SELECT COUNT(id) FROM classes;`;
      conn.query(sql, (err, data) => {
        if (err) {
          reject(err);
        }
        resolve(data);
      });
    });
    ctx.sendSuccess({
      list,
      total: total[0]['COUNT(id)'],
    });
  } catch (error) {
    ctx.sendError(null);
  }
}
interface addClassBodyType {
  classNumber: string; // 班级名称
  grade: number;
  collegeId: number; // 分院编号
  specialtyName: string; // 专业名称
  createdAt: string;
  updatedAt: string;
}
export async function addClass(ctx: Context) {
  // const { classNumber, grade, collegeId, specialtyName } = ctx.body as unknown as addClassBodyType;
  // // const list = await Class.create({
  // //   classNumber,
  // //   grade,
  // //   collegeId,
  // //   specialtyName,
  // //   createdAt: currentDate,
  // //   updatedAt: currentDate,
  // // });
  // // const total = await Class.count();
  // ctx.sendSuccess({
  //   list,
  //   total,
  // });
}
