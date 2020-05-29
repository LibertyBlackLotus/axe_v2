'use strict';

module.exports = app => {
	const {router, controller, jwt} = app;

	router.post('/api/user/login', controller.user.login);     // 用户登录
	router.put('/api/user/:id', jwt, controller.user.update);  // 修改用户信息
	router.resources('/api/user', controller.user);            // 用户
	router.resources('/api/cate', controller.cate);            // 分类
	router.get('/api/community/cate/:id', controller.community.communityCate); // 获取分类下的社区列表
	router.post('/api/community/search', controller.community.communitySearch);  // 搜索社区
	router.put('/api/community/:id', jwt, controller.community.update);          // 修改社区信息
	router.resources('/api/community', controller.community);             // 社区
	router.get('/api/ax/user/:id', controller.ax.axUser);                 // 获取某用户的所有斧头
	router.get('/api/ax/cate/:id', controller.ax.axCate);                 // 获取某分类下的所有斧头
	router.get('/api/ax/community/:id', controller.ax.axCommunity);       // 获取某社区下的所有斧头
	router.post('/api/ax/search', controller.ax.axSearch);                // 搜索斧头
	router.resources('/api/ax', controller.ax);                           // 斧头
	router.get('/api/read/user/:id', jwt, controller.read.userRead);      // 用户阅读斧头记录
	router.resources('/api/read', jwt, controller.read);                  // 斧头阅读记录
	router.delete('/api/praise', jwt, controller.praise.removePraise);    // 取消点赞
	router.post('/api/praise/isPraise', jwt, controller.praise.isPraise); // 是否点赞
	router.resources('/api/praise', jwt, controller.praise);              // 点赞
	router.get('/api/comment/ax/:id', controller.comment.getListByAx);    // 获取斧头评论列表
	router.resources('/api/comment', jwt, controller.comment);            // 评论
	router.delete('/api/userFollows', jwt, controller.userFollows.removeFollowed);      // 取消关注
	router.post('/api/userFollows/isFollowed', jwt, controller.userFollows.isFollowed); // 是否关注
	router.get('/api/userFollows/user/:id', jwt, controller.userFollows.getFocusList);  // 用户关注列表
	router.resources('/api/userFollows', jwt, controller.userFollows);                  // 关注
	router.delete('/api/collect', jwt, controller.collection.removeCollect);         // 取消收藏
	router.post('/api/collect/isCollected', jwt, controller.collection.isCollected); // 是否收藏
	router.get('/api/collect/user/:id', jwt, controller.collection.getCollectionList);  // 用户收藏列表
	router.resources('/api/collect', jwt, controller.collection);                    // 收藏

	router.post('/api/upload', controller.upload.uploadStream);           // 上传文件

};
