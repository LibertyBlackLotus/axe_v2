'use strict';

const { Controller } = require('egg');
const { InvalidQueryError, NotFoundError, ExistError, CommonError } = require('./error');

class BaseController extends Controller{

	service  //当前service

	/**
	 * 获取列表
	 * @returns {Promise.<void>}
	 */
	async index(){
		const {ctx} = this;
		const index = await this.service.find();
		ctx.body = index;
	}

	/**
	 * 创建
	 * @returns {Promise.<void>}
	 */
	async create(){
		const {ctx} = this;
		const data = ctx.request.body;
		if(!data){
			throw new InvalidQueryError();
		}
		const item = await this.service.create(data);
		if(!item){
			throw new CommonError('保存失败', 500);
		}
		ctx.body = item;
	}

	/**
	 * 删除
	 * @returns {Promise.<void>}
	 */
	async destroy(){
		const {ctx} = this;
		const {id} = ctx.params;
		if(!id){
			throw new InvalidQueryError();
		}
		const item = await this.service.deleteById(id);
		if(!item){
			throw new NotFoundError();
		}
		ctx.body = item;
	}

	/**
	 * 修改
	 * @returns {Promise.<void>}
	 */
	async update(){
		const {ctx} = this;
		const {id} = ctx.params;
		const data = ctx.request.body;
		if(!id || !data){
			throw new InvalidQueryError();
		}
		const before = await this.service.updateById({_id: id}, data);
		if(!before){
			throw new NotFoundError();
		}
		let after = await this.service.findById(id);
		ctx.body = { before, after };
	}

	/**
	 * 查询
	 * @returns {Promise.<void>}
	 */
	async show(){
		const {ctx} = this;
		const {id} = ctx.params;
		if(!id){
			throw new InvalidQueryError();
		}
		const item = await this.service.findById(id);
		if(!item){
			throw new NotFoundError();
		}
		ctx.body = item;
	}

}
module.exports = BaseController;