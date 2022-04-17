import { Context } from 'koa';
import Jwt from 'jsonwebtoken';
import config from '../../config/index';
import { currentDate } from '../../utils/index';
import { UserAuth } from '../../model/mysql/UserAuth';
import Bcryptjs from 'bcryptjs';

type requestType = {
  /** 学号 */
  studentId: string;
  /** 密码 */
  passWord: string;
  /** 电话 */
  phoneNumber: string;
};

type LoginRequestType = {
  /** 学号 */
  studentId: string;
  /** 密码 */
  passWord: string;
};
class IndexController {
  async register(ctx: Context) {
    const { studentId, passWord, phoneNumber } = ctx.request.body as requestType;
    try {
      try {
        const findOneRes = await UserAuth.findOne({ where: { studentId } });
        if (findOneRes) {
          ctx.sendError(null, `学号为${studentId}已存在`);
        } else {
          try {
            const hashPassWord = Bcryptjs.hashSync(passWord, 10);
            const createRes = await UserAuth.create({
              studentId,
              passWord: hashPassWord,
              phoneNumber,
              createdAt: currentDate,
              updatedAt: currentDate,
            });
            const token = Jwt.sign({ studentID: createRes.studentId }, config.jwtKey.publicKey, {
              expiresIn: '2h',
            });
            ctx.sendSuccess({
              token,
            });
          } catch (error) {
            ctx.sendError(null);
          }
        }
      } catch (error) {
        console.log(error);
        ctx.sendError(null);
      }
    } catch (error) {
      ctx.sendError(null);
    }
  }
  async login(ctx: Context) {
    const { studentId, passWord } = ctx.request.body as LoginRequestType;
    try {
      const findOneRes = await UserAuth.findOne({ where: { studentId } });
      if (findOneRes) {
        const verifyRes = Bcryptjs.compareSync(passWord, findOneRes.passWord);
        if (verifyRes) {
          const token = Jwt.sign({ studentId }, config.jwtKey.publicKey, {
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
