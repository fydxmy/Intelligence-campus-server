'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const jsonwebtoken_1 = __importDefault(require('jsonwebtoken'));
const index_1 = __importDefault(require('../../config/index'));
const index_2 = require('../../utils/index');
const bcryptjs_1 = __importDefault(require('bcryptjs'));
const mysql_1 = require('../../db/mysql');
class IndexController {
  async register(ctx) {
    const { studentId, passWord, phoneNumber } = ctx.request.body;
    try {
      const sql = `SELECT * FROM userAuths WHERE studentId=${studentId}`;
      const conn = (0, mysql_1.getConn)('userAuths');
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
      const hashPassWord = bcryptjs_1.default.hashSync(passWord, 10);
      const addSql = `INSERT INTO userAuths VALUES(null,"${studentId}","${phoneNumber}", "${hashPassWord}", "${index_2.currentDate}", "${index_2.currentDate}")`;
      const addRes = await new Promise((resolve, reject) => {
        conn.query(addSql, (err, data) => {
          if (err) {
            reject(err);
          }
          resolve(data);
        });
      });
      if (addRes) {
        const token = jsonwebtoken_1.default.sign({ studentId }, index_1.default.jwtKey.publicKey, {
          expiresIn: 604800000,
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
  async login(ctx) {
    const { phoneNumber, passWord } = ctx.request.body;
    const conn = (0, mysql_1.getConn)('userAuths');
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
        const verifyRes = bcryptjs_1.default.compareSync(passWord, findRes[0].passWord);
        if (verifyRes) {
          const token = jsonwebtoken_1.default.sign(
            { phoneNumber, studentId, role },
            index_1.default.jwtKey.publicKey,
            {
              expiresIn: '2h',
            }
          );
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
exports.default = new IndexController();
