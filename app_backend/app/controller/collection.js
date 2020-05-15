'use strict';

const BaseController = require('../base/BaseController');
const { InvalidQueryError, CommonError } = require('../base/error');

class CollectionController extends BaseController{
	constructor(model){
		super(model);
		this.service = this.ctx.service.collection; //传入当前service
	}

	/**
	 * 获取收藏列表
	 * @returns {Promise.<void>}
	 */
	async getCollectionList(){
		const {ctx} = this;
		const {id} = ctx.params;
		if(!id){
			throw new InvalidQueryError();
		}
		const item = await this.service.find({user: id});
		ctx.body = item;
	}

	/**
	 * 收藏
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
			throw new CommonError('收藏失败', 500);
		}
		ctx.service.ax.updateById(item.ax, {$inc: {collections: 1}});
		ctx.body = true;
	}

	/**
	 * 取消收藏
	 * @returns {Promise.<void>}
	 */
	async removeCollect(){
		const { ctx } = this;
		let {ax, user} = ctx.request.body;
		if(!ax || !user){
			throw new InvalidQueryError();
		}
		const item = await this.service.delete({ax, user});
		if(!item){
			throw new CommonError('取消收藏失败', 500);
		}
		ctx.service.ax.updateById(ax, {$inc: {collections: -1}});
		ctx.body = false;
	}

	/**
	 * 是否收藏
	 * @returns {Promise.<void>}
	 */
	async isCollected(){
		const { ctx } = this;
		let {ax, user} = ctx.request.body;
		if(!ax || !user){
			throw new InvalidQueryError();
		}
		const item = await this.service.findOne({ax, user});
		if(!item){
			ctx.body = false;
		}else{
			ctx.body = true;
		}
	}
}
module.exports = CollectionController;