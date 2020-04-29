'use strict';

module.exports = app => {
	const mongoose = app.mongoose;
	const Schema = mongoose.Schema;
	const ModelSchema = new Schema({
		ax: { //斧头图片地址
			type: Array,
			required: true
		},
		title: { // 标题
			type: String,
			required: true
		},
		author: { // 作者
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: true
		},
		content: { // 内容
			type: String,
			required: true
		},
		cate: {  //分类
			type: Schema.Types.ObjectId,
			ref: 'Cate'
		},
		community: {  //社区
			type: Schema.Types.ObjectId,
			ref: 'Community'
		},
		state: { //0:草稿, 1:已发布, 2:已撤销
			type: Number,
			default: 0
		},
		reads: {//阅读数
			type: Number,
			default: 0
		},
		collections: { //收藏数
			type: Number,
			default: 0
		},
		praises: {   //点赞数
			type: Number,
			default: 0
		},
		create_time: { 		     // 创建时间
			type: Date,
			default: Date.now,
		},
		update_time: {           //修改时间
			type: Date,
			default: Date.now,
		}
	}, {
		versionKey: false,
		timestamps: {createdAt: 'create_time', updatedAt: 'update_time'}
	});
	return mongoose.model('Ax', ModelSchema);
};