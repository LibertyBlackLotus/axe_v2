'use strict';

const BaseController = require('../base/BaseController');

class UserFollowsController extends BaseController{
	constructor(model){
		super(model);
		this.service = this.ctx.service.userFollows; //传入当前service
	}

	/**
	 * 关注
	 * @returns {Promise.<void>}
	 */
	async create(){
		const { ctx } = this;
		let data = ctx.request.body;
		if(!data){
			throw new InvalidQueryError();
		}
		const item = await this.service.create(data);
		if(!item){
			throw new CommonError('关注失败', 500);
		}
		ctx.service.user.updateById(item.user, {$inc: {followed: 1}});
		ctx.body = true;
	}

	/**
	 * 取消关注
	 * @returns {Promise.<void>}
	 */
	async removeFollowed(){
		const { ctx } = this;
		let {user, follows} = ctx.request.body;
		if(!user || !follows){
			throw new InvalidQueryError();
		}
		const item = await this.service.delete({follows, user});
		if(!item){
			throw new CommonError('取消关注失败', 500);
		}
		ctx.service.user.updateById(user, {$inc: {followed: -1}});
		ctx.body = false;
	}

	/**
	 * 是否关注
	 * @returns {Promise.<void>}
	 */
	async isFollowed(){
		const { ctx } = this;
		let {follows, user} = ctx.request.body;
		if(!follows || !user){
			throw new InvalidQueryError();
		}
		const item = await this.service.findOne({follows, user});
		if(!item){
			ctx.body = false;
		}else{
			ctx.body = true;
		}
	}

	/**
	 * 获取用户关注列表
	 * @returns {Promise.<void>}
	 */
	async getFocusList(){
		const { ctx } = this;
		let {id} = ctx.params;
		if(!id){
			throw new InvalidQueryError();
		}
		const item = await this.service.find({follows: id});
		ctx.body = item;
	}
}
module.exports = UserFollowsController;