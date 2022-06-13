'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.emojiRegExp =
  exports.validStrLen =
  exports.isHttpsUrl =
  exports.isUrl =
  exports.appIdRegExp =
  exports.PHONE_MY =
  exports.PHONE =
    void 0;
/* eslint-disable prettier/prettier */
/* eslint-disable no-useless-escape */
exports.PHONE = /^1{1}[3|4|5|6|7|8|9]\d{9}$/;
exports.PHONE_MY = /^1\d{10}$/;
// 小程序appId正则
exports.appIdRegExp = /^wx\S{13,99}$/;
const reg =
  /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;
const httpsReg =
  /(((^https:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;
// 是否是http链接
const isUrl = (path) => reg.test(path);
exports.isUrl = isUrl;
// 是否是https链接
const isHttpsUrl = (path) => httpsReg.test(path);
exports.isHttpsUrl = isHttpsUrl;
/**
 * 校验汉字长度
 * @param {number} limitLen
 * @param {string} value
 * @return {*}
 */
const validStrLen = (limitLen, value) => {
  const limit = limitLen * 2;
  if (!value) {
    return true;
  }
  let len = 0;
  for (let i = 0; i < value.length; i++) {
    const c = value.charCodeAt(i);
    // 单字节加1
    if ((c >= 0x0001 && c <= 0x007e) || (c >= 0xff60 && c <= 0xff9f)) {
      // eslint-disable-next-line no-plusplus
      len++;
    } else {
      len += 2;
    }
  }
  if (len > limit) {
    return false;
  }
  return true;
};
exports.validStrLen = validStrLen;
// 判断字符中是否含有emoji的表情
exports.emojiRegExp = /(\ud83c[\udf00-\udfff])|(\ud83d[\udc00-\ude4f\ude80-\udeff])|[\u2600-\u2B55]/;
