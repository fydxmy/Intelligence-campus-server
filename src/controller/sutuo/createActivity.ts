import Koa from 'koa';
import { ObjStr, currentDate } from '../../utils';
import { executeSQL } from '../../db/mysql';

export type ActivityType = {
  id: number; // 活动Id
  title: string; // 活动标题
  introduce: string; // 活动介绍
  startTime: string; // 活动开始时间
  endTime: string; // 活动结束时间
  imgUrl: string; // 活动图片
  grade: number; // 活动分数
  rankName: string; // 活动级别
  rankId: string; // 分院编号或者是班级编号
  stStatus: string; // 活动状态
  location: string; // 活动地点

  organization: string; // 活动组织
  initiator: string; // 活动发起人姓名
  canNumber: number; // 可以参与人数
  stalreadyNumber: number; // 已经参与人数
  inishNumber: number; // 已经完成的人数

  signWay: string; // 活动签到方式
  auditId: string; // 活动审核人Id

  auditName: string; // 活动审核人名字
  updatedAt: string; // 更新时间
  createdAt: string; // 创建时间
};
export default async function createActivity(ctx: Koa.Context) {
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
  } = ctx.request.body as Omit<ActivityType, 'id' | 'updatedAt' | 'createdAt'>;
  const sql = `INSERT INTO sutuo_activity (title,introduce,startTime,endTime,imgUrl,grade,rankName,rankId,stStatus,location,organization,initiator,canNumber,signWay,updatedAt,createdAt) values (${ObjStr(
    {
      title,
      introduce,
      startTime,
      endTime,
      imgUrl,
      grade,
      rankName,
      rankId,
      stStatus: 1, // 1是未审核状态 2 是审核通过状态
      location,
      organization,
      initiator,
      canNumber,
      signWay, // 1 是定位签到 2是扫描签到
      updateAt: currentDate,
      createAt: currentDate,
    }
  )})`;
  console.log(sql);
  try {
    const res = await executeSQL(sql, 'sutuo_activity');
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
