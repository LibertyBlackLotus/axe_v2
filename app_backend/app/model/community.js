'use strict';

module.exports = app => {
	const mongoose = app.mongoose;
	const Schema = mongoose.Schema;
	const ModelSchema = new Schema({
		name: { // 社区名称
			type: String,
			required: true
		},
		cate: {  //分类
			type: Schema.Types.ObjectId,
			ref: 'Cate',
			required: true
		},
		content: { // 社区描述
			type: String
		},
		fans: { //社区粉丝
			type: Number,
			default: 0
		},
		logo: { //社区logo
			type: String,
			default: 'http://192.168.8.133:10241/img/2020/03/teche.png'
		},
		banner: { //社区banner
			type: String,
			default: 'http://192.168.8.133:10241/img/2020/03/131697914430864848.png'
		},
		status: { //1:正常, 0:禁用
			type: Number,
			default: 1
		},
		visit: { //社区访问次数
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
	return mongoose.model('Community', ModelSchema);
};