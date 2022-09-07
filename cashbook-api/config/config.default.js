/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1662430570505_4935';

  // add your middleware config here
  config.middleware = [];

  config.security = {
    csrf: {
      enable: false,
      ignoreJSON: true
    },
    domainWhiteList: [ '*' ], // 配置白名单
  };

  config.mysql = {
    client: {
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'a111111', 
    database: 'cashbook',
    },
    app: true,
    agent: false,
  };

  config.jwt = {
    secret: 'ym-cashbook'
  }

  config.multipart = {
    mode: 'file'
  }

  config.cors = {
    origin: '*',
    credentials: true,
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH'
  }

  const userConfig = {
    uploadDir: 'app/public/upload'
  };

  return {
    ...config,
    ...userConfig,
  };
};
