'use strict';

const BaseController = require('../base/BaseController');
const { InvalidQueryError, CommonError } = require('../base/error');

class CommentController extends BaseController{
	constructor(model){
		super(model);
		this.service = this.ctx.service.comment; //传入当前service
	}

	/**
	 *  获取斧头评论列表
	 * @returns {Promise.<*>}
	 * @constructor
	 */
	async getListByAx() {
		const {ctx} = this;
		const {id} = ctx.params;
		if (!id) {
			throw new InvalidQueryError();
		}
		const result = await this.service.find({ax: id});
		if (!result) {
			throw new CommonError('获取列表失败', 500);
		}
		ctx.body = result;
	}

	/**
	 * 添加评论
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
		ctx.service.ax.updateById(item.ax, {$inc: {comments: 1}});
		const result = await this.service.find({ax: item.ax});
		ctx.body = result;
	}

	/**
	 * 删除评论
	 * @returns {Promise.<void>}
	 */
	async destroy(){
		const {ctx} = this;
		const {id} = ctx.params;
		if (!id) {
			throw new InvalidQueryError();
		}
		const item = await this.service.deleteById(id);
		if(!item){
			throw new CommonError('删除失败', 500);
		}
		ctx.service.ax.updateById(ax, {$inc: {comments: -1}});
		ctx.body = item;
	}

}
module.exports = CommentController;