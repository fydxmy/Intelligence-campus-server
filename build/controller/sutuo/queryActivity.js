'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.queryActivity = void 0;
const mysql_1 = require('../../db/mysql');
const utils_1 = require('../../utils');
async function queryActivity(ctx) {
  let { pageNumber = 1, pageSize = 10, stStatus } = ctx.query;
  pageNumber = Number(pageNumber);
  pageSize = Number(pageSize);
  stStatus = Number(stStatus);
  try {
    let ListSqlWhere = '';
    if (stStatus) {
      ListSqlWhere = `WHERE ${(0, utils_1.ObjToStrQuote)({ stStatus })}`;
    }
    const ListSql = `SELECT * FROM sutuo_activity ${ListSqlWhere} LIMIT ${(pageNumber - 1) * pageSize}, ${pageSize}`;
    console.log(ListSql);
    const list = await (0, mysql_1.executeSQL)(ListSql, 'sutuo_activity');
    const totalSql = `SELECT COUNT(id) FROM sutuo_activity;`;
    const total = await (0, mysql_1.executeSQL)(totalSql, 'sutuo_activity');
    ctx.sendSuccess({
      list,
      total: total[0]['COUNT(id)'],
    });
  } catch (error) {
    ctx.sendError(null);
  }
}
exports.queryActivity = queryActivity;
