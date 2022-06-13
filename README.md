### 语义化版本发布

基于[standard-version](https://github.com/conventional-changelog/standard-version)进行版本管理和 changelog 管理，执行以下命令可以依据 package.json 里的 version 进行 tag 版本生成和 push。

```bash
# 默认发布minor版本，如v1.0.0 -> v1.1.0
npm run release -- --prerelease

# 发布major版本，如v1.0.0 -> v2.0.0
npm run release -- --release-as minor

#发布patch版本，如v1.1.0 -> v1.1.1
npm run release -- --release-as minor
```

版本格式说明：主版本号.次版本号.修订号，版本号递增规则如下：

- 主版本号(major)：当你做了不兼容的 API 修改，
- 次版本号(minor)：当你做了向下兼容的功能性新增，可以理解为 Feature 版本，
- 修订号(patch)：当你做了向下兼容的问题修正，可以理解为 Bug fix 版本。

测试环境无需创建 tag 版本，可自行选择相应分支进行发布，默认是 dev 分支

## 端口号被占用

- netstat -o -n -a | findstr :8686
- taskkill /F /PID 地址
