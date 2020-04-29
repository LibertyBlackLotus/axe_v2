'use strict';

const BaseController = require('../base/BaseController');

class CommunityController extends BaseController {
	constructor(model) {
		super(model);
		this.service = this.ctx.service.community; //传入当前service
	}

	/**
	 *  获取分类下的社区列表
	 * @returns {Promise.<*>}
	 * @constructor
	 */
	async communityCate() {
		const {ctx} = this;
		const {cate} = ctx.params;
		if (!cate) {
			throw new InvalidQueryError();
		}
		const result = await this.service.find({status: 1, cate});
		if (!result) {
			throw new CommonError('获取列表失败', 500);
		}
		ctx.body = result;
	}

	/**
	 *  搜索社区
	 * @returns {Promise.<*>}
	 * @constructor
	 */
	async communitySearch() {
		const {ctx} = this;
		const {keywords} = ctx.request.body;
		if (!keywords) {
			throw new InvalidQueryError();
		}
		let reg = new RegExp(keywords, 'i'); //不区分大小写
		const result = await this.service.find({
			$or: [
				{name: {$regex: reg}}
			]
		});
		if (!result) {
			ctx.body = '无结果';
		} else {
			ctx.body = result;
		};
	}
}

module.exports = CommunityController;