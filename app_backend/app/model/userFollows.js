'use strict';

module.exports = app => {
	const mongoose = app.mongoose;
	const Schema = mongoose.Schema;
	const ModelSchema = new Schema({
		user: { // 用户
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		follows: { // 关注用户
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: true,
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
	return mongoose.model('UserFollows', ModelSchema);
};