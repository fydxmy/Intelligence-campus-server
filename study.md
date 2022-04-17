git push -u origin "master"
git config user.name "肖培阳"
git config --global user.email "fydxmy@163.com"

## 项目依赖

### sequelize

Sequelize 是一个基于 promise 的 Node.js ORM, 目前支持 Postgres, MySQL, MariaDB, SQLite 以及 Microsoft SQL Server. 它具有强大的事务支持, 关联关系, 预读和延迟加载,读取复制等功能。

### log4js

用于日志

### msyql2

### ts-jest

测试

## 项目文件结构

启动文件时 bin/www

### nodemon

```json
{
  "watch": ["app/**/*.ts", "./index.ts"], // 需要监听的文件
  "ignore": ["node_modules"], // 忽略的文件
  "exec": "ts-node index.ts", // nodemon启动的跟文件
  "ext": ".ts" // 以.ts结尾的文件。
}
```

## jest

单元测试： unit testing
集成测试： unit testing
npx jest --coverage
或
jest ---coverage

自动监测测试

代码测试覆盖率

npx jest --init

## mysql

ORM - Object Relational Mapping
建模 （外键）& 同步到数据库
更具模型 增删改查 & 连表查询
数据表，用 JS 钟的模型（class 或对象）代替
sql 语句， 用对象方法代替。

## .eslintrc.js 解释

```js
  {
    "semi": true, // 语句强制分号结尾
    "singleQuote": true, // 字符串使用单引号
  }
```

## jwt 和 session

session 访问频繁，对性能要求极高。
session 可以不考虑断电丢失数据问题（内存的硬伤）
数据量不会太大（相对于 mysql 中存储）

redis 不合适使用场景？

- 操作频繁不是太高
- 断电不能丢失，必须要保存
- 数据量太大，内存成功太高。

## Commitizen
