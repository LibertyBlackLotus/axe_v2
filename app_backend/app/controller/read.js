'use strict';

const BaseController = require('../base/BaseController');
const { InvalidQueryError, CommonError } = require('../base/error');

class ReadController extends BaseController{
	constructor(model){
		super(model);
		this.service = this.ctx.service.read; //传入当前service
	}

	/**
	 * 创建
	 * @returns {Promise.<void>}
	 */
	async create(){
		const { ctx } = this;
		let data = ctx.request.body;
		let {ax, user} = data;
		if(!ax || !user){
			throw new InvalidQueryError();
		}
		ctx.service.ax.updateById(ax, {$inc: {reads: 1}}); //阅读数加1
		let record = await this.service.findOne({ax, user});
		if(record){
			let item = await this.service.updateById(record._id, {update_time: new Date()});
			ctx.body = item;
		}else{
			let item = await this.service.create(data);
			if(!item){
				throw new CommonError('添加失败', 500);
			}
			ctx.body = item;
		}
	}

	/**
	 *  获取用户浏览记录
	 * @returns {Promise.<*>}
	 * @constructor
	 */
	async userRead() {
		const {ctx} = this;
		const {id} = ctx.params;
		if (!id) {
			throw new InvalidQueryError();
		}
		const result = await this.service.find({user: id});
		if (!result) {
			throw new CommonError('获取列表失败', 500);
		}
		ctx.body = result;
	}

}
module.exports = ReadController;