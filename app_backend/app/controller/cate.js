'use strict';

const BaseController = require('../base/BaseController');

class CateController extends BaseController{
	constructor(model){
		super(model);
		this.service = this.ctx.service.cate; //传入当前service
	}
}
module.exports = CateController;