'use strict';

module.exports = app => {
	const mongoose = app.mongoose;
	const Schema = mongoose.Schema;
	const ModelSchema = new Schema({
		content: { //评论内容
			type: String,
			require: true
		},
		ax: {
			type: Schema.Types.ObjectId,
			ref: 'Ax',
			require: true
		},
		user: { //评论用户
			type: Schema.Types.ObjectId,
			ref: 'User',
			require: true
		},
		reply: { //回复
			type: Schema.Types.ObjectId,
			ref: 'Comment',
		},
		replyUser: { //回复用户
			type: Schema.Types.ObjectId,
			ref: 'User',
		},
		replyCount: { //回复数
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
	return mongoose.model('Comment', ModelSchema);
};