import React, {Component} from 'react';
import {
	View,
	StyleSheet,
	Button
} from 'react-native';
import { ListItem  } from 'react-native-elements';
import PropTypes from 'prop-types';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import {getUserInfo} from '../utils';

class MyInfoSettings extends Component {
	constructor(props){
		super(props);
		this.state = {
			userInfo: null,
			avatar: require('../assets/avatar.png')
		};

		this.logout = this.logout.bind(this);
		this.chooseAvatar = this.chooseAvatar.bind(this);
		this.modifyUserInfo = this.modifyUserInfo.bind(this);
	}

	async componentDidMount(){
		let userInfo = await getUserInfo();
		this.setState({userInfo});
	}

	//退出登录
	logout(){
		global.removeValue('userInfo');
		global.removeValue('token');
		this.props.navigation.navigate('LoginNavigator');
	}

	//选择头像
	chooseAvatar(){
		ImagePicker.launchImageLibrary((response) => {
			console.log('Response = ', response);
			if (response.didCancel) {
				console.log('User cancelled image picker');
			} else if (response.error) {
				console.log('ImagePicker Error: ', response.error);
			} else if (response.customButton) {
				console.log('User tapped custom button: ', response.customButton);
			} else {
				let {uri} = response;
				let { userInfo } = this.state;
				userInfo.avatar = uri;
				this.setState({ userInfo });
				this.uploadAvatar(uri);  //上传头像
			}
		});
	}

	//上传头像
	uploadAvatar(uri){
		let formData = new FormData();
		let file = {uri: uri, type: 'multipart/form-data', name: 'image.png'};
		formData.append("files", file);   //这里的files就是后台需要的key
		axios({
			method: 'post',
			url: 'upload',
			data: formData
		}).then( res => {
			let params = {
				_id: this.state.userInfo._id,
				avatar: res.url
			};
			this.props.modifyUserInfo(params).then(res => {
				global.storeData('userInfo', res.after);
			});
		}).catch(error => {
			console.log(error);
		});
	}

	//修改用户信息
	modifyUserInfo(){

	}

	render() {
		const { userInfo } = this.state;
		let uri = userInfo&&userInfo.avatar? {uri: userInfo.avatar}: this.state.avatar;
		//设置列表
		const list = [
			{
				title: userInfo&&userInfo.nickname,
				rightTitle: '昵称',
			},
			{
				title: userInfo&&userInfo.gender,
				rightTitle: '性别'
			},
			{
				title: userInfo&&userInfo.birthday,
				rightTitle: '生日',
			}
		]
		return (
			<View>
				{userInfo &&
					<>
						<ListItem
							leftAvatar={{ source: uri }}
							title="头像"
							onPress={this.chooseAvatar}
						/>
						{list.map((item, i) => (
							<ListItem
								key={i}
								title={item.title}
								rightTitle={item.rightTitle}
								chevron
							/>
						))}
					</>
				}
				<Button title="退出登录"
						buttonStyle={{backgroundColor: '#16a085'}}
						onPress={this.logout} />
			</View>
		);
	}
}

MyInfoSettings.propTypes = {
	modifyUserInfo: PropTypes.func //更换头像
};

const styles = StyleSheet.create({
	avatar: {
		width: 40,
		height: 40
	}
});

export default MyInfoSettings;