'use strict';

const BaseService = require('../base/BaseService');

class UserFollowsService extends BaseService{
	constructor(model){
		super(model);
		this.model = this.ctx.model.UserFollows;  //传入当前model
	}

	/**
	 * 查询 populate
	 * @param {Object} option 查询参数
	 * @return {Array} 查询结果
	 */
	async find(option = {}){
		return await this.model.find(option).sort({create_time: -1})
			.populate('user', 'username nickname avatar')
	}

}
module.exports = UserFollowsService;