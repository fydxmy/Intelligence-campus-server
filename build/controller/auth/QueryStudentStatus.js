'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.QueryStudentStatus = void 0;
const mysql_1 = require('../../db/mysql');
const QueryStudentStatus = async (ctx) => {
  const { studentId } = ctx.request.auth;
  try {
    const conn = (0, mysql_1.getConn)('studentstatus');
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
exports.QueryStudentStatus = QueryStudentStatus;
