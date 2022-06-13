// import Koa from 'koa';
// import { College } from '../../model/mysql/College';
// const queryCollege = async function (ctx: Koa.Context, next: Koa.Next) {
//   const { pageSize = 10, pageNumber = 1 } = ctx.body as { pageSize: number; pageNumber: number };
//   try {
//     const list = await College.findAll({ offset: (pageNumber - 1) * pageSize, limit: pageSize });
//     const total = await College.count();
//     ctx.sendSuccess({ list, total });
//     next();
//   } catch (error) {
//     ctx.sendError(null);
//   }
// };
// const collegeController = { queryCollege };
// export default collegeController;
