'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const utils_1 = require('../../utils');
const mysql_1 = require('../../db/mysql');
async function createActivity(ctx) {
  const {
    title,
    introduce,
    startTime,
    endTime,
    imgUrl,
    grade,
    rankName,
    rankId,
    location,
    organization,
    initiator,
    canNumber,
    signWay,
  } = ctx.request.body;
  const sql = `INSERT INTO sutuo_activity (title,introduce,startTime,endTime,imgUrl,grade,rankName,rankId,stStatus,location,organization,initiator,canNumber,signWay,updatedAt,createdAt) values (${(0,
  utils_1.ObjStr)({
    title,
    introduce,
    startTime,
    endTime,
    imgUrl,
    grade,
    rankName,
    rankId,
    stStatus: 1,
    location,
    organization,
    initiator,
    canNumber,
    signWay,
    updateAt: utils_1.currentDate,
    createAt: utils_1.currentDate,
  })})`;
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
exports.default = createActivity;
