import {
	AX,
	AX_LIST,
	AX_USER,
	AX_USER_ADD,
} from "../actionTypes";

const user = (state = {axList: [], axListUser: [], axDetail: null }, action) => {
	switch(action.type){
		case AX_LIST:      //所有斧头列表
			return Object.assign({}, state, { axList:  action.axList });
		case AX_USER:      //用户斧头列表
			return Object.assign({}, state, { axListUser:  action.axListUser });
		case AX_USER_ADD:  //创建斧头
			return Object.assign({}, state, { axListUser:  action.axListUser });
		case AX:           //获取斧头
			return Object.assign({}, state, { axDetail:  action.axDetail });
		default:
			return state;
	}
}

export default user;