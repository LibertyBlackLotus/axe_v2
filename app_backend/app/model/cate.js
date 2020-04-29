'use strict';

module.exports = app => {
	const mongoose = app.mongoose;
	const Schema = mongoose.Schema;
	const ModelSchema = new Schema({
		title: {  // 分类名称
			type: String,
			required: true
		},
		content: { // 分类描述
			type: String
		},
		status: {  // 分类状态
			type: Number,
			default: 1
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
	return mongoose.model('Cate', ModelSchema);
};