import React from 'react';
import { View, Button, Text} from 'react-native';
import PropTypes from 'prop-types';
import MyInfoShow from './MyInfoShow';
import MyInfoRead from '../containers/MyInfoRead';
import MyInfoAx from './MyInfoAx';
import {getUserInfo, getUserId} from '../utils';

class My extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			userInfo: null,
			userId: null,
		}
	}

	componentDidMount(){
		let params = this.props.route.params;
		if(params){
			this.setState({userId: params.id});
		}
		this.checkUserInfo();
	}

	componentDidUpdate(prevProps, prevState){
		let preId = prevState.userId;
		let nowId = this.state.userId;
		if (nowId !== preId) {
			this.checkUserInfo();
		}
	}

	async checkUserInfo(){
		let userInfo = await getUserInfo();
		let userId = await getUserId();
		console.log('checkUserInfo---userInfo-->', userInfo);
		if(!userInfo){
			this.props.navigation.navigate('LoginNavigator');
		}
		this.setState({userInfo, userId});
	}

	render(){
		return (
			<>
				<MyInfoShow userInfo={this.state.userInfo} {...this.props}></MyInfoShow>
			</>
		);
	}
}

My.propTypes = {
}
export default My;