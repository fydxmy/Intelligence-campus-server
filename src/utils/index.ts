import moment from 'moment';
import Charset from 'superagent-charset';
import SuperAgent from 'superagent';
// 获取当前时间戳
export const currentDate = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');

export async function getWebHTMLstr(url: string) {
  return Charset(SuperAgent).get(url).charset('utf-8').buffer(true);
}
