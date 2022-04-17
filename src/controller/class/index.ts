import { Context } from 'koa';
import { Class } from '../../model/mysql/Class';
import { currentDate } from '../../utils';

type queryClassQueryType = {
  pageNumber: number;
  pageSize: number;
};
export async function queryClass(ctx: Context) {
  const { pageNumber = 1, pageSize = 10 } = ctx.query as unknown as queryClassQueryType;
  const list = await Class.findAll({ offset: (pageNumber - 1) * pageSize, limit: pageSize });
  const total = await Class.count();
  ctx.sendSuccess({
    list,
    total,
  });
}
interface addClassBodyType {
  classNumber: string; // 班级名称
  grade: number;
  collegeId: number; // 分院编号
  specialtyName: string; // 专业名称
  createdAt: string;
  updatedAt: string;
}
export async function addClass(ctx: Context) {
  const { classNumber, grade, collegeId, specialtyName } = ctx.body as unknown as addClassBodyType;
  const list = await Class.create({
    classNumber,
    grade,
    collegeId,
    specialtyName,
    createdAt: currentDate,
    updatedAt: currentDate,
  });
  const total = await Class.count();
  ctx.sendSuccess({
    list,
    total,
  });
}
