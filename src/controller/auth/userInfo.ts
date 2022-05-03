import Koa from 'koa';
import { getConn } from '../../db/mysql';

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
}
