'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const mysql_1 = require('../../db/mysql');
async function queryCampusNews(ctx) {
  const { type, pageSize = 10, pageNumber = 1 } = ctx.query;
  try {
    const listSql = `select * from jg_news ${type ? `where type="${type}"` : ''} order by dateTime desc limit ${
      (pageNumber - 1) * pageSize
    }, ${pageSize}`;
    console.log(listSql);
    const list = await (0, mysql_1.executeSQL)(listSql, 'jg_news');
    const totalSql = `select count(*) as sum from jg_news ${type ? `where type="${type}"` : ''}`;
    console.log(totalSql);
    const total = await (0, mysql_1.executeSQL)(totalSql, 'jg_news');
    return ctx.sendSuccess({ list, total: total[0].sum });
  } catch (error) {
    ctx.sendError(null);
  }
}
exports.default = queryCampusNews;
