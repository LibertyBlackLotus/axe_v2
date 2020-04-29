'use strict';

module.exports = app => {
	const {router, controller, jwt} = app;

	router.post('/api/user/login', controller.user.login);     // 用户登录
	router.put('/api/user/:id', jwt, controller.user.update);  // 修改用户信息
	router.resources('/api/user', controller.user);            // 用户

	router.resources('/api/cate', controller.cate);            // 分类

	router.get('/api/community/cate/:cate', controller.community.communityCate); // 获取分类下的社区列表
	router.post('/api/community/search', controller.community.communitySearch);  // 搜索社区
	router.put('/api/community/:id', jwt, controller.community.update);  // 修改社区信息
	router.resources('/api/community', controller.community);  // 社区

	router.get('/api/ax/cate/:id', controller.ax.axCate);           // 获取某分类下的所有斧头
	router.get('/api/ax/community/:id', controller.ax.axCommunity); // 获取某社区下的所有斧头
	router.post('/api/ax/search', controller.ax.axSearch);          // 搜索斧头
	router.resources('/api/ax', controller.ax);  // 斧头



};
