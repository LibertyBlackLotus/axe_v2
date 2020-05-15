import {
	AX,
	AX_LIST,
	AX_USER,
	AX_USER_ADD
} from '../actionTypes';

//获取所有斧头列表
export function getAxList(axList = []){
	return {
		type: AX_LIST,
		axList
	}
}

//获取用户斧头列表
export function getAxListByUser(axListUser = []){
	return {
		type: AX_USER,
		axListUser
	}
}

//创建斧头
export function addAx(axListUser = []){
	return {
		type: AX_USER_ADD,
		axListUser
	}
}

//获取斧头
export function getAxDetail(axDetail = null){
	return {
		type: AX,
		axDetail
	}
}




