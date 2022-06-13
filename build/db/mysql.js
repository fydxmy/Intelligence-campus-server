'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.executeSQL = exports.getConn = void 0;
const mysql_1 = __importDefault(require('mysql'));
const config_1 = __importDefault(require('../config'));
const { database, user, password, options } = config_1.default.mysql;
const connObj = {};
function getConn(name) {
  if (!connObj[name]) {
    connObj[name] = mysql_1.default.createPool({
      host: options.host,
      user,
      database,
      password,
    });
  }
  return connObj[name];
}
exports.getConn = getConn;
async function executeSQL(sql, sqlName) {
  const conn = getConn(sqlName);
  return new Promise((resolve, reject) => {
    conn.getConnection((err, connection) => {
      if (err) {
        reject(err);
      } else {
        connection.query(sql, (err, data) => {
          if (err) {
            reject(err);
          } else {
            resolve(data);
          }
          connection.release();
        });
      }
    });
  });
}
exports.executeSQL = executeSQL;
