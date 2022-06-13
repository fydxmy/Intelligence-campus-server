'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.ObjStr =
  exports.ObjToStrQuoteWhere =
  exports.ObjToStrQuote =
  exports.clearEmptyValue =
  exports.getWebHTMLstr =
  exports.currentDate =
    void 0;
const moment_1 = __importDefault(require('moment'));
const superagent_charset_1 = __importDefault(require('superagent-charset'));
const superagent_1 = __importDefault(require('superagent'));
// 获取当前时间戳
exports.currentDate = (0, moment_1.default)(new Date()).format('YYYY-MM-DD HH:mm:ss');
async function getWebHTMLstr(url) {
  return (0, superagent_charset_1.default)(superagent_1.default).get(url).charset('utf-8').buffer(true);
}
exports.getWebHTMLstr = getWebHTMLstr;
function clearEmptyValue(objData) {
  const newObjData = {};
  const itemArr = Object.keys(objData);
  itemArr.forEach((item) => {
    if (objData[item] === undefined || objData[item] === null || objData[item] === '') {
    } else {
      Object.assign(newObjData, { [item]: objData[item] });
    }
  });
  return newObjData;
}
exports.clearEmptyValue = clearEmptyValue;
/** 用户与update set方法 */
function ObjToStrQuote(objData) {
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
exports.ObjToStrQuote = ObjToStrQuote;
function ObjToStrQuoteWhere(objData) {
  let Str = '';
  const itemArr = Object.keys(objData);
  itemArr.forEach((item, index) => {
    if (index !== itemArr.length - 1) {
      if (!objData[item]) return;
      if (typeof objData[item] === 'string') {
        Str = Str + `${item}="${objData[item]}" &&`;
      } else {
        Str = Str + `${item}=${objData[item]} &&`;
      }
    } else {
      if (!objData[item]) return;
      if (typeof objData[item] === 'string') {
        Str = Str + `${item}="${objData[item]}"`;
      } else {
        Str = Str + `${item}=${objData[item]}`;
      }
    }
  });
  return Str;
}
exports.ObjToStrQuoteWhere = ObjToStrQuoteWhere;
function ObjStr(objData) {
  const itemArr = Object.keys(objData);
  let str = '';
  itemArr.forEach((item) => {
    if (typeof objData[item] === 'number') {
      str = str + objData[item] + ',';
    }
    if (typeof objData[item] === 'string') {
      str = str + `"${objData[item]}",`;
    }
  });
  return str.substring(0, str.length - 1);
}
exports.ObjStr = ObjStr;
