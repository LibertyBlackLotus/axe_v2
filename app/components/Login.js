import React from 'react';
import { View, Button, TextInput} from 'react-native';
import PropTypes from 'prop-types';

class Login extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			username: '',
			password: ''
		};
		this.handleUsernameChange = this.handleUsernameChange.bind(this);
		this.handlePasswordChange = this.handlePasswordChange.bind(this);
		this.loginMethod = this.loginMethod.bind(this);
		this.toRegister = this.toRegister.bind(this);
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

	loginMethod(){
		let { username, password } = this.state;
		let params = { username, password };
		this.props.login(params).then( res => {
			if(res){
				global.storeData('userInfo', res.userInfo).then(data => {
					global.storeData('token', res.token);
					console.log('after login---->', this.props.route );
					console.log('after login--navigation-->', this.props.navigation );
					// this.props.navigation.navigate('BottomTabNavigator', {screen: 'Home'});
					this.props.navigation.goBack();
				});
			}
		});
	}

	toRegister(){
		this.props.navigation.navigate('Register');
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
				<Button title="登录" onPress={this.loginMethod} />
				<Button title="注册" onPress={this.toRegister} />
			</View>
		);
	}
}

Login.propTypes = {
	data: PropTypes.object, //用户信息
	login: PropTypes.func,  //登录
}
export default Login;