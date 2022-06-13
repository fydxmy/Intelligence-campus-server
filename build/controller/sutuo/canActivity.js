'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const utils_1 = require('../../utils');
const mysql_1 = require('../../db/mysql');
async function canActivity(ctx) {
  const { title, grade, state, activityId } = ctx.request.body;
  const { phoneNumber, studentId } = ctx.request.auth;
  const sql = `INSERT INTO sutuo_grade (title,phoneNumber,studentId,grade,state,activityId, createdAt) values (${(0,
  utils_1.ObjStr)({
    title,
    phoneNumber,
    studentId,
    grade,
    state,
    activityId,
    createdAt: utils_1.currentDate,
  })})`;
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
exports.default = canActivity;
