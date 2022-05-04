import Koa from 'koa';
import { getConn } from '../../db/mysql';
import { executeSQL } from '../../db/mysql';
import { clearEmptyValue, currentDate, ObjToStrQuote } from '../../utils';

export const QueryUserInfo = async (ctx: Koa.Context) => {
  const { studentId } = ctx.request.auth;
  try {
    const conn = getConn('userinfo');
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

export async function authTokenController(ctx: Koa.Context) {
  const { phoneNumber } = ctx.request.auth;
  try {
    const conn = getConn('userinfo');
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

export async function updateUserInfo(ctx: Koa.Context) {
  const { phoneNumber } = ctx.request.auth;
  const { nickName, avatar, selfIntroduction, age, gender } = ctx.request.body as {
    nickName: string;
    avatar: string;
    selfIntroduction: string;
    age: number;
    gender: number;
  };
  const UpdateDataStr = ObjToStrQuote(
    clearEmptyValue({ nickName, avatar, selfIntroduction, age, gender, updatedAt: currentDate })
  );
  try {
    const updateUserInfoSql = `UPDATE userinfo SET ${UpdateDataStr} WHERE phoneNumber=${phoneNumber}`;
    const res = await executeSQL(updateUserInfoSql, 'userinfo');
    if (res) {
      const userinfoSql = `select * FROM userinfo WHERE phoneNumber="${phoneNumber}"`;
      const queryUserinfoRes = await executeSQL(userinfoSql, 'userinfo');
      ctx.sendSuccess({ userInfo: queryUserinfoRes[0] });
    }
  } catch (error) {
    ctx.sendError(null);
  }
}
