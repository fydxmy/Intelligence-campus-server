'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.addClass = exports.queryClass = void 0;
const mysql_1 = require('../../db/mysql');
async function queryClass(ctx) {
  const { pageNumber = 1, pageSize = 10 } = ctx.query;
  const conn = (0, mysql_1.getConn)('classes');
  try {
    const list = await new Promise((resolve, reject) => {
      const sql = `SELECT * FROM classes LIMIT ${(pageNumber - 1) * pageSize}, ${pageSize}`;
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
exports.queryClass = queryClass;
// interface addClassBodyType {
//   classNumber: string; // 班级名称
//   grade: number;
//   collegeId: number; // 分院编号
//   specialtyName: string; // 专业名称
//   createdAt: string;
//   updatedAt: string;
// }
async function addClass(ctx) {
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
exports.addClass = addClass;
