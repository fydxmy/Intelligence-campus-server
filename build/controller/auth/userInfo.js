'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.updateUserInfo = exports.authTokenController = exports.QueryUserInfo = void 0;
const mysql_1 = require('../../db/mysql');
const mysql_2 = require('../../db/mysql');
const utils_1 = require('../../utils');
const QueryUserInfo = async (ctx) => {
  const { studentId } = ctx.request.auth;
  try {
    const conn = (0, mysql_1.getConn)('userinfo');
    const findRes = await new Promise((resolve, reject) => {
      const sql = `select * FROM userinfo WHERE studentId="${studentId}"`;
      conn.query(sql, (err, data) => {
        if (err) {
          reject(err);
        }
        resolve(data);
      });
    });
    if (findRes[0]) {
      ctx.sendSuccess({
        userInfo: findRes[0],
      });
    } else {
      ctx.sendError(null, '查询不到该用户信息');
    }
  } catch (error) {
    ctx.sendError(null);
  }
};
exports.QueryUserInfo = QueryUserInfo;
async function authTokenController(ctx) {
  const { phoneNumber } = ctx.request.auth;
  try {
    const conn = (0, mysql_1.getConn)('userinfo');
    const findRes = await new Promise((resolve, reject) => {
      const sql = `select * FROM userinfo WHERE phoneNumber="${phoneNumber}"`;
      conn.query(sql, (err, data) => {
        if (err) {
          reject(err);
        }
        resolve(data);
      });
    });
    if (findRes[0]) {
      ctx.sendSuccess({
        userInfo: findRes[0],
      });
    } else {
      ctx.sendError(null, '查询不到该用户信息');
    }
  } catch (error) {
    ctx.sendError(null);
  }
}
exports.authTokenController = authTokenController;
async function updateUserInfo(ctx) {
  const { phoneNumber } = ctx.request.auth;
  const { nickName, avatar, selfIntroduction, age, gender } = ctx.request.body;
  const UpdateDataStr = (0, utils_1.ObjToStrQuote)(
    (0, utils_1.clearEmptyValue)({ nickName, avatar, selfIntroduction, age, gender, updatedAt: utils_1.currentDate })
  );
  try {
    const updateUserInfoSql = `UPDATE userinfo SET ${UpdateDataStr} WHERE phoneNumber=${phoneNumber}`;
    const res = await (0, mysql_2.executeSQL)(updateUserInfoSql, 'userinfo');
    if (res) {
      const userinfoSql = `select * FROM userinfo WHERE phoneNumber="${phoneNumber}"`;
      const queryUserinfoRes = await (0, mysql_2.executeSQL)(userinfoSql, 'userinfo');
      ctx.sendSuccess({ userInfo: queryUserinfoRes[0] });
    }
  } catch (error) {
    ctx.sendError(null);
  }
}
exports.updateUserInfo = updateUserInfo;
