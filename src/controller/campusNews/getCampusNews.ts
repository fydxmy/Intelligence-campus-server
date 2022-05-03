import Koa from 'koa';
import { getWebHTMLstr } from '../../utils';
import Cheerio from 'cheerio';
import { executeSQL } from '../../db/mysql';

export default async function getCampusNews(ctx: Koa.Context) {
  const { url } = ctx.request.body as { url: string };
  const arr = [];
  try {
    const res = await getWebHTMLstr(url);
    const $ = Cheerio.load(res.text, {
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
      await executeSQL(
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
