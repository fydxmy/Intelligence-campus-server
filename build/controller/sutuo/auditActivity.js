'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const utils_1 = require('../../utils');
const mysql_1 = require('../../db/mysql');
async function auditActivity(ctx) {
  const { auditId, auditName, stStatus, id } = ctx.request.body;
  const sql = `UPDATE sutuo_activity SET ${(0, utils_1.ObjToStrQuote)({ auditId, auditName, stStatus })} WHERE ${(0,
  utils_1.ObjToStrQuote)({
    id,
  })}`;
  console.log(sql);
  try {
    const res = await (0, mysql_1.executeSQL)(sql, 'sutuo_activity');
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
exports.default = auditActivity;
