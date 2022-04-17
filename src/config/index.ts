import dotenv from 'dotenv';
dotenv.config();

const ENV = process.env.NODE_ENV;
console.log(`当前环境是：${process.env.NODE_ENV}`);

let config = {
  server: {
    port: 8686,
  },
  mysql: {
    database: 'zs_campus',
    user: 'fydxmy',
    password: 'ABCxpy6630755@',
    options: {
      host: 'rm-bp17xikp4s6o14008mo.mysql.rds.aliyuncs.com',
      port: 3306,
    },
  },
  redis: {
    host: 'localhost',
    port: 6,
  },
  secretKey: {
    session: 'XMY_fydxmy123',
  },
  jwtKey: {
    publicKey:
      'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDVjuVnj34QuRwmBxVCU1Fk+IuYCAANchHQGeDnnAbGUWYOIsIKCMVCDYlQqL0GL6sC5Jpx3M6GSQUgxL1SR2hYqOvaxfUCYRKlRcLBbraCqlc7rC+FrFLxctLS7POks/lJSEGXkM7wrka73V+w2nvTx52+5RpFzbn7XOFo4cvzLwIDAQAB',
    privateKey:
      'MIICXgIBAAKBgQDVjuVnj34QuRwmBxVCU1Fk+IuYCAANchHQGeDnnAbGUWYOIsIKCMVCDYlQqL0GL6sC5Jpx3M6GSQUgxL1SR2hYqOvaxfUCYRKlRcLBbraCqlc7rC+FrFLxctLS7POks/lJSEGXkM7wrka73V+w2nvTx52+5RpFzbn7XOFo4cvzLwIDAQABAoGAbwvU4drNdKisqGF6fniQlG5hN/bBADzWYl1ygzywkSL2bFdKiqkw2T3srxJu5+6Vf/WbEaX9hfomPnnO8B/Nc4iqwVqocIK2P8/7IlcqbRvFTOOJWcX0W3ubo54yjf5HGTyqbeO5lT7E+7TdGP6GUSjYpdWYxZI6Yya3sy3ZDuECQQD+ZgF/ivhwlUZDDSoioUX9NgQcvDkZ/kilOdJtaQFT1tqQPFqLUqFGLRVME9lUWFRfkJw5ZHShbt0J3zFtSFAHAkEA1ucSOMYN4dXUonDxOxHTDbfgVnI4+FR/k5hgcenFXpBTBAQjLaooQCI52jvEU2BkzfpdagTpWs8kYsNHxmUpmQJBAPCJZnU/4zQgEHUpp2Ni9Zg7UJwS5DLNmcaP64UDufuZtMKYLkx5bn+59N8gDWeQtQY+51fkwdo5xsmkvUlFDFUCQQCXr03LSPAvgTCu361FllU0D5+HJORVU78gvKMGhIzNLG2MHid+aeYzLnVLNnhiqV09jgQ1evYDJMZ394JH5MuxAkEAqtJf9AiKzI+hJtEKTuvhDC1UROyyocny6fcw5hBJhjHY8MCRdWUvmwChK0N1uhM/z3lHa8fwyQRREgUSDPeB+A==',
  },
};

switch (ENV) {
  case 'dev':
    config = {
      server: {
        port: 8686,
      },
      mysql: {
        database: 'zs_campus',
        user: 'fydxmy',
        password: 'ABCxpy6630755@',
        options: {
          host: 'rm-bp17xikp4s6o14008mo.mysql.rds.aliyuncs.com',
          port: 3306,
        },
      },
      redis: {
        host: 'localhost',
        port: 6,
      },
      secretKey: {
        session: 'XMY_fydxmy123',
      },
      jwtKey: {
        publicKey:
          'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDVjuVnj34QuRwmBxVCU1Fk+IuYCAANchHQGeDnnAbGUWYOIsIKCMVCDYlQqL0GL6sC5Jpx3M6GSQUgxL1SR2hYqOvaxfUCYRKlRcLBbraCqlc7rC+FrFLxctLS7POks/lJSEGXkM7wrka73V+w2nvTx52+5RpFzbn7XOFo4cvzLwIDAQAB',
        privateKey:
          'MIICXgIBAAKBgQDVjuVnj34QuRwmBxVCU1Fk+IuYCAANchHQGeDnnAbGUWYOIsIKCMVCDYlQqL0GL6sC5Jpx3M6GSQUgxL1SR2hYqOvaxfUCYRKlRcLBbraCqlc7rC+FrFLxctLS7POks/lJSEGXkM7wrka73V+w2nvTx52+5RpFzbn7XOFo4cvzLwIDAQABAoGAbwvU4drNdKisqGF6fniQlG5hN/bBADzWYl1ygzywkSL2bFdKiqkw2T3srxJu5+6Vf/WbEaX9hfomPnnO8B/Nc4iqwVqocIK2P8/7IlcqbRvFTOOJWcX0W3ubo54yjf5HGTyqbeO5lT7E+7TdGP6GUSjYpdWYxZI6Yya3sy3ZDuECQQD+ZgF/ivhwlUZDDSoioUX9NgQcvDkZ/kilOdJtaQFT1tqQPFqLUqFGLRVME9lUWFRfkJw5ZHShbt0J3zFtSFAHAkEA1ucSOMYN4dXUonDxOxHTDbfgVnI4+FR/k5hgcenFXpBTBAQjLaooQCI52jvEU2BkzfpdagTpWs8kYsNHxmUpmQJBAPCJZnU/4zQgEHUpp2Ni9Zg7UJwS5DLNmcaP64UDufuZtMKYLkx5bn+59N8gDWeQtQY+51fkwdo5xsmkvUlFDFUCQQCXr03LSPAvgTCu361FllU0D5+HJORVU78gvKMGhIzNLG2MHid+aeYzLnVLNnhiqV09jgQ1evYDJMZ394JH5MuxAkEAqtJf9AiKzI+hJtEKTuvhDC1UROyyocny6fcw5hBJhjHY8MCRdWUvmwChK0N1uhM/z3lHa8fwyQRREgUSDPeB+A==',
      },
    };
    break;

  default:
    break;
}
export default config;
