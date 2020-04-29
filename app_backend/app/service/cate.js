'use strict';

const BaseService = require('../base/BaseService');

class CateService extends BaseService{
	constructor(model){
		super(model);
		this.model = this.ctx.model.Cate;  //传入当前model
	}

}
module.exports = CateService;