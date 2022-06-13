'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const utils_1 = require('../../utils');
const mysql_1 = require('../../db/mysql');
async function queryActivityGrade(ctx) {
  const { activityId } = ctx.request.body;
  const { phoneNumber } = ctx.request.auth;
  const sql = `SELECT * FROM sutuo_grade WHERE ${(0, utils_1.ObjToStrQuoteWhere)({ activityId, phoneNumber })}`;
  try {
    const res = await (0, mysql_1.executeSQL)(sql, 'sutuo_grade');
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
exports.default = queryActivityGrade;
