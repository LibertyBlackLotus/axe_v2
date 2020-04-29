'use strict';

module.exports = app => {
	const mongoose = app.mongoose;
	const Schema = mongoose.Schema;
	const ModelSchema = new Schema({
		username: { // 用户名
			type: String,
			required: true,
		},
		password: { // 密码
			type: String,
			required: true,
		},
		weixin: { //微信
			type: Schema.Types.ObjectId,
			ref: 'Weixin'
		},
		nickname: {  // 昵称
			type: String,
			default: '用户' + new Date().getTime()
		},
		birthday: { // 生日
			type: String,
			default: '保密'
		},
		gender: {  //性别
			type: String,
			default: '保密'
		},
		followed: { //粉丝
			type: Number,
			default: 0
		},
		accessToken: String,     //token
		avatar: String,          //头像
		phone_num: String,       //电话号码
		email: String,        	 //邮箱
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
	return mongoose.model('User', ModelSchema);
};