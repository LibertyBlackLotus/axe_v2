'use strict';

const BaseController = require('../base/BaseController');

class AxController extends BaseController{
	constructor(model){
		super(model);
		this.service = this.ctx.service.ax; //传入当前service
	}

	/**
	 *  获取某分类下的所有斧头
	 * @returns {Promise.<*>}
	 * @constructor
	 */
	async axCate() {
		const {ctx} = this;
		const {id} = ctx.params;
		if (!id) {
			throw new InvalidQueryError();
		}
		const result = await this.service.find({state: 1, cate: id});
		if (!result) {
			throw new CommonError('获取列表失败', 500);
		}
		ctx.body = result;
	}

	/**
	 *  获取某社区下的所有斧头
	 * @returns {Promise.<*>}
	 * @constructor
	 */
	async axCommunity() {
		const {ctx} = this;
		const {id} = ctx.params;
		if (!id) {
			throw new InvalidQueryError();
		}
		const result = await this.service.find({state: 1, community: id});
		if (!result) {
			throw new CommonError('获取列表失败', 500);
		}
		ctx.body = result;
	}

	/**
	 *  搜索斧头
	 * @returns {Promise.<*>}
	 * @constructor
	 */
	async axSearch() {
		const {ctx} = this;
		const {keywords} = ctx.request.body;
		if (!keywords) {
			throw new InvalidQueryError();
		}
		let reg = new RegExp(keywords, 'i'); //不区分大小写
		const result = await this.service.find({
			$or : [ //多条件，数组 模糊查询
				{title : {$regex : reg}},
				{content : {$regex : reg}}
			]
		});
		if (!result) {
			ctx.body = '无结果';
		}
		ctx.body = result;
	}


}
module.exports = AxController;