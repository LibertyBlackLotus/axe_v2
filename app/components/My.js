import React from 'react';
import { View, Button, Text} from 'react-native';
import PropTypes from 'prop-types';
import MyInfoShow from './MyInfoShow';
import MyInfoRead from '../containers/MyInfoRead';
import MyInfoAx from './MyInfoAx';
import {getUserInfo} from '../utils';

class My extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			userInfo: null
		}
	}

	componentDidMount(){
		this.checkUserInfo();
	}

	async checkUserInfo(){
		let userInfo = await getUserInfo();
		if(!userInfo){
			this.props.navigation.navigate('LoginNavigator');
		}
		this.setState({userInfo});
	}

	render(){
		return (
			<>
				<MyInfoShow userInfo={this.state.userInfo} {...this.props}></MyInfoShow>
				{/*<MyInfoRead />*/}
				<MyInfoAx {...this.props}></MyInfoAx>
			</>
		);
	}
}

My.propTypes = {
}
export default My;