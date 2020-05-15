'use strict';

const BaseController = require('../base/BaseController');
const { InvalidQueryError, CommonError } = require('../base/error');

class PraiseController extends BaseController{
	constructor(model){
		super(model);
		this.service = this.ctx.service.praise; //传入当前service
	}

	/**
	 * 点赞
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
			throw new CommonError('创建失败', 500);
		}
		ctx.service.ax.updateById(item.ax, {$inc: {praises: 1}});
		ctx.body = true;
	}

	/**
	 * 取消点赞
	 * @returns {Promise.<void>}
	 */
	async removePraise(){
		const { ctx } = this;
		let {ax, user} = ctx.request.body;
		if(!ax || !user){
			throw new InvalidQueryError();
		}
		const item = await this.service.delete({ax, user});
		if(!item){
			throw new CommonError('删除失败', 500);
		}
		ctx.service.ax.updateById(ax, {$inc: {praises: -1}});
		ctx.body = false;
	}

	/**
	 * 是否点赞
	 * @returns {Promise.<void>}
	 */
	async isPraise(){
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
module.exports = PraiseController;