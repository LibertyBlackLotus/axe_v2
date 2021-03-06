'use strict';

const BaseService = require('../base/BaseService');

class AxService extends BaseService{
	constructor(model){
		super(model);
		this.model = this.ctx.model.Ax;  //传入当前model
	}

	/**
	 * 查询 populate
	 * @param {Object} option 查询参数
	 * @return {Array} 查询结果
	 */
	async find(option = {}){
		return await this.model.find(option).sort({create_time: -1})
			             .populate('author', 'username nickname avatar')
			             .populate('cate', 'title content')
			             .populate('community', 'name');
	}

	/**
	 * 查询 populate
	 * @param {Object} option 查询参数
	 * @return {Array} 查询结果
	 */
	async findById(_id = 0){
		return await this.model.findOne({_id}).sort({create_time: -1})
			.populate('author', 'username nickname avatar')
			.populate('cate', 'title content')
			.populate('community', 'name');
	}

}
module.exports = AxService;