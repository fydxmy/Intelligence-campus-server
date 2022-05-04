import moment from 'moment';
import Charset from 'superagent-charset';
import SuperAgent from 'superagent';
// 获取当前时间戳
export const currentDate = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');

export async function getWebHTMLstr(url: string) {
  return Charset(SuperAgent).get(url).charset('utf-8').buffer(true);
}

export function clearEmptyValue(objData: { [key: string]: any }) {
  const newObjData: { [key: string]: any } = {};
  const itemArr = Object.keys(objData);
  itemArr.forEach((item) => {
    if (objData[item] === undefined || objData[item] === null || objData[item] === '') {
    } else {
      Object.assign(newObjData, { [item]: objData[item] });
    }
  });
  return newObjData;
}

export function ObjToStrQuote(objData: { [key: string]: any }) {
  let Str = '';
  const itemArr = Object.keys(objData);
  itemArr.forEach((item, index) => {
    if (index !== itemArr.length - 1) {
      if (typeof objData[item] === 'string') {
        Str = Str + `${item}="${objData[item]}",`;
      } else {
        Str = Str + `${item}=${objData[item]},`;
      }
    } else {
      if (typeof objData[item] === 'string') {
        Str = Str + `${item}="${objData[item]}"`;
      } else {
        Str = Str + `${item}=${objData[item]}`;
      }
    }
  });
  return Str;
}
