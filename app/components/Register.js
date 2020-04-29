import React, { Component } from 'react';
import { View, Button, TextInput } from 'react-native';
import PropTypes from 'prop-types';
class Register extends Component{
	constructor(props) {
		super(props);
		this.handleUsernameChange = this.handleUsernameChange.bind(this);
		this.handlePasswordChange = this.handlePasswordChange.bind(this);
		this.registerMethod = this.registerMethod.bind(this);
		this.state = {
			username: '',
			password: ''
		}
	}

	handleUsernameChange(text){
		this.setState({
			username: text
		});
	}

	handlePasswordChange(text){
		this.setState({
			password: text
		});
	}

	registerMethod(){
		let { username, password } = this.state;
		let params = { username, password };
		this.props.register(params).then( res => {
			global.storeData('userInfo', res.userInfo);
			global.storeData('token', res.token);
			this.props.navigation.navigate('BottomTabNavigator', {screen: 'Home'});
		});
	}

	render(){
		return (
			<View>
				<TextInput
					name="username"
					value={this.state.username}
					onChangeText={text => this.handleUsernameChange(text)}
					placeholder="用户名"
				/>
				<TextInput
					name="password"
					value={this.state.password}
					onChangeText={text => this.handlePasswordChange(text)}
					placeholder="密码"
				/>
				<Button title="注册" onPress={this.registerMethod}></Button>
			</View>
		);
	}
}
Register.propTypes = {
	data: PropTypes.object,   //用户信息
	register: PropTypes.func, //注册
}

export default Register;