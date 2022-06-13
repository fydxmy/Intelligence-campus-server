'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const utils_1 = require('../../utils');
const cheerio_1 = __importDefault(require('cheerio'));
const mysql_1 = require('../../db/mysql');
async function getCampusNews(ctx) {
  const { url } = ctx.request.body;
  const arr = [];
  try {
    const res = await (0, utils_1.getWebHTMLstr)(url);
    const $ = cheerio_1.default.load(res.text, {
      decodeEntities: false,
      xmlMode: false,
      lowerCaseTags: false,
    });
    const type = $('.news-title').find('h2').text();
    $('.news-list ul li').each((index, element) => {
      const $element = $(element);
      arr.push({
        title: $element.find('h3').find('a').text(),
        url: $element.find('h3').find('a').attr('href'),
        dateTime: $element
          .find('h3')
          .find('span')
          .text()
          .replace(/[\[\]]/g, '')
          .trim(),
        type,
      });
    });
  } catch (error) {
    ctx.sendError(null, '获取的web页面数据错误');
  }
  try {
    let total = 0;
    arr.forEach(async (item) => {
      await (0, mysql_1.executeSQL)(
        `insert jg_news (title, url, dateTime, type) values ("${item.title}", "${item.url}", "${item.dateTime}", "${item.type}")`,
        'jg_news'
      );
      total++;
      console.log(total);
    });
    return ctx.sendSuccess({});
  } catch (error) {
    ctx.sendError(null);
  }
}
exports.default = getCampusNews;
