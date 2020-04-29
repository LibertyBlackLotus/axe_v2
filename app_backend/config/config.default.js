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
	config.keys = appInfo.name + '_1587707909594_4559';

	// add your middleware config here
	config.middleware = [
		'errorHandler'
	];

	/**
	 * mongodb 设置
	 * @type {{url: (*|string), options: {server: {poolSize: number}}}}
	 */
	config.mongoose = {
		url: process.env.EGG_MONGODB_URL || 'mongodb://127.0.0.1:27017/axe',
		options: {
			server: {
				poolSize: 40,
			},
		},
	};

	//JWT鉴权私钥
	config.jwt = {
		secret: 'lin'
	};

	//csrf安全设置
	config.security = {
		csrf: false,
	};

	// add your user config here
	const userConfig = {
		// myAppName: 'egg',
	};

	return {
		...config,
		...userConfig,
	};
};
