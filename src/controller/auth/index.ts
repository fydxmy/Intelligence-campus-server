import { Context } from 'koa';
import Jwt from 'jsonwebtoken';
import config from '../../config/index';
import { currentDate } from '../../utils/index';
import Bcryptjs from 'bcryptjs';
import { getConn } from '../../db/mysql';

type requestType = {
  studentId: string;
  passWord: string;
  phoneNumber: string;
};

type LoginRequestType = {
  phoneNumber: string;
  passWord: string;
};
class IndexController {
  async register(ctx: Context) {
    const { studentId, passWord, phoneNumber } = ctx.request.body as requestType;
    try {
      const sql = `SELECT * FROM userAuths WHERE studentId=${studentId}`;
      const conn = getConn('userAuths');
      const findres = await new Promise((resolve, reject) => {
        conn.query(sql, (err, data) => {
          if (err) {
            reject(err);
          }
          resolve(data);
        });
      });
      if (findres[0]) {
        ctx.sendError(null, `学号为${studentId}已存在`);
        return;
      }
      const hashPassWord = Bcryptjs.hashSync(passWord, 10);
      const addSql = `INSERT INTO userAuths VALUES(null,"${studentId}","${phoneNumber}", "${hashPassWord}", "${currentDate}", "${currentDate}")`;
      const addRes = await new Promise((resolve, reject) => {
        conn.query(addSql, (err, data) => {
          if (err) {
            reject(err);
          }
          resolve(data);
        });
      });
      if (addRes) {
        const token = Jwt.sign({ studentId }, config.jwtKey.publicKey, {
          expiresIn: '2h',
        });
        ctx.sendSuccess({
          token,
        });
      } else {
        ctx.sendError(null);
      }
    } catch (error) {
      ctx.sendError(null);
    }
  }
  async login(ctx: Context) {
    const { phoneNumber, passWord } = ctx.request.body as LoginRequestType;
    const conn = getConn('userAuths');
    try {
      const findRes = await new Promise((resolve, reject) => {
        const sql = `SELECT * FROM userAuths WHERE phoneNumber=${phoneNumber}`;
        conn.query(sql, (err, data) => {
          if (err) {
            reject(err);
          }
          resolve(data);
        });
      });
      if (findRes[0]) {
        const { phoneNumber, studentId, role } = findRes[0];
        const verifyRes = Bcryptjs.compareSync(passWord, findRes[0].passWord);
        if (verifyRes) {
          const token = Jwt.sign({ phoneNumber, studentId, role }, config.jwtKey.publicKey, {
            expiresIn: '2h',
          });
          ctx.sendSuccess({ token }, '登录成功');
        } else {
          ctx.sendError(null, '账号或密码错误');
        }
      } else {
        ctx.sendError(null, '账号或密码错误');
      }
    } catch (error) {
      ctx.sendError(null);
    }
  }
}
export default new IndexController();
