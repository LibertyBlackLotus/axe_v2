'use strict';

const BaseService = require('../base/BaseService');

class PraiseService extends BaseService{
	constructor(model){
		super(model);
		this.model = this.ctx.model.Praise;  //传入当前model
	}

}
module.exports = PraiseService;