'use strict';

const BaseService = require('../base/BaseService');

class CommunityService extends BaseService{
	constructor(model){
		super(model);
		this.model = this.ctx.model.Community;  //传入当前model
	}

}
module.exports = CommunityService;