import Koa from 'koa';
import { getConn } from '../../db/mysql';

export const QueryStudentStatus = async (ctx: Koa.Context) => {
  const { studentId } = ctx.request.auth;
  try {
    const conn = getConn('studentstatus');
    const findRes = await new Promise((resolve, reject) => {
      const sql = `select s.*, c.className, co.collegeName from studentStatus s left join classes c on s.classId=c.id left join colleges co on s.collegeId = co.id where studentId=${studentId}`;
      conn.query(sql, (err, data) => {
        if (err) {
          reject(err);
        }
        resolve(data);
      });
    });
    if (findRes[0]) {
      ctx.sendSuccess({
        studentStatus: findRes[0],
      });
    } else {
      ctx.sendError(null, '查询不到该用户学籍信息');
    }
  } catch (error) {
    ctx.sendError(null);
  }
};
