'use strict';

module.exports = app => {
	const mongoose = app.mongoose;
	const Schema = mongoose.Schema;
	const ModelSchema = new Schema({
		openId: {  // 微信id
			type: String,
			required: true
		},
		user: { //用户
			type: Schema.Types.ObjectId,
			ref: 'User'
		},
		accessToken: String,     //token
		avatar: String,          //头像
		phone_num: String,       //电话号码
		last_login_time: String, //上次登录时间
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
	return mongoose.model('Weixin', ModelSchema);
};