'use strict';

const BaseController = require('../base/BaseController');
const bcrypt = require('bcryptjs');
const { InvalidQueryError, NotFoundError, ExistError, CommonError } = require('../base/error');

class UserController extends BaseController{
	constructor(model){
		super(model);
		this.service = this.ctx.service.user; //传入当前service
	}

	/**
	 * 注册用户
	 * @returns {Promise.<void>}
	 */
	async create(){
		const { ctx, app } = this;
		let data = ctx.request.body;
		if(!data){
			throw new InvalidQueryError();
		}
		let result = await this.service.findOne({username: data.username});
		if(result){
			throw new ExistError();
		}
		let salt = bcrypt.genSaltSync(10);
		data.password = bcrypt.hashSync(data.password, salt);  //密码加密
		const user = await this.service.create(data);
		if(!user){
			throw new CommonError('保存失败', 500);
		}
		ctx.body = {
			userInfo: user,
			token: app.jwt.sign({
				data: user._id,
				exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 7), //设置 token 过期时间: 7d
			}, app.config.jwt.secret)
		};
	}

	/**
	 * 登录
	 * @returns {Promise.<void>}
	 */
	async login(){
		const { ctx, app } = this;
		const {username, password} = ctx.request.body;
		if (!username || !password) {
			throw new InvalidQueryError();
		}
		const user = await this.service.findOne({username});
		if (!user) {
			throw new NotFoundError('用户不存在');
		}
		if (!bcrypt.compareSync(password, user.password)) {
			throw new InvalidQueryError('密码错误');
		}
		ctx.body = {
			userInfo: user,
			token: app.jwt.sign({
				data: user._id,
				exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 7), //设置 token 过期时间: 7d
			}, app.config.jwt.secret)
		}
	}
}
module.exports = UserController;