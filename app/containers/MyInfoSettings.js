import { connect } from 'react-redux';
import http from '../store/server';
import {
	modifyUserInfo
} from '../store/actions';

import {
	API_USER
} from '../store/apiUrl';

import MyInfoSettings from '../components/MyInfoSettings';

const mapStateToProps = (state) => {
	return {
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		/* 更换头像 */
		modifyUserInfo: (data) => {
			return http({method: 'PUT', url: API_USER  + `/${data._id}`, data}).then(res => {
				dispatch(modifyUserInfo(res));
				return Promise.resolve(res);
			});
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(MyInfoSettings);
