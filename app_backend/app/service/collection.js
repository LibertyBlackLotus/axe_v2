'use strict';

const BaseService = require('../base/BaseService');

class CollectionService extends BaseService{
	constructor(model){
		super(model);
		this.model = this.ctx.model.Collection;  //传入当前model
	}

	/**
	 * 查询 populate
	 * @param {Object} option 查询参数
	 * @return {Array} 查询结果
	 */
	async find(option = {}){
		return await this.model.find(option).sort({update_time: -1})
			.populate('ax', 'ax title content author update_time')
	}

}
module.exports = CollectionService;