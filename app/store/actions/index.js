import {
	USER,
	REGISTER,
	LOGIN,
	AX_READ_LIST
} from '../actionTypes';

export function getUserList(data = {}){
	return {
		type: USER,
		data
	}
}

//注册
export function register(data = {}){
	return {
		type: REGISTER,
		data
	}
}

//登录
export function login(data = {}){
	return {
		type: LOGIN,
		data
	}
}

//获取阅读记录
export function getReadList(readList = []){
	return {
		type: AX_READ_LIST,
		readList
	}
}


