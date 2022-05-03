import mysql from 'mysql';
import config from '../config';
const { database, user, password, options } = config.mysql;
const connObj = {};
export function getConn(name: string): mysql.Pool {
  if (!connObj[name]) {
    connObj[name] = mysql.createPool({
      host: options.host,
      user,
      database,
      password,
    });
  }
  return connObj[name];
}

export async function executeSQL(sql: string, sqlName: string) {
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
