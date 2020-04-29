import React, {Component} from 'react';
import {
	View,
	StyleSheet,
	Text,
	Image,
	TouchableOpacity,
	ImageBackground,
	Dimensions,
	Button
} from 'react-native';
import PropTypes from 'prop-types';

const {width} = Dimensions.get('window');

class MyInfoShow extends Component {
	constructor(props){
		super(props);
		this.state = {
			avatar: require('../assets/avatar.png'),
			bgImg: require('../assets/show.jpg')
		};

		this.toSettings = this.toSettings.bind(this);
	}

	toSettings(){
		this.props.navigation.navigate('MyInfoSettings');
	}

	render() {
		let { userInfo } = this.props;
		let uri = userInfo&&userInfo.avatar? {uri: userInfo.avatar}: this.state.avatar;
		return (
			<>
				{
					userInfo &&
					<TouchableOpacity style={styles.myInfo} onPress={this.toSettings}>
						<ImageBackground source={this.state.bgImg} style={styles.bgImage} />
						<View style={styles.avatarContent}>
							<Image style={styles.avatar}
								   source={uri} />
							<Text style={styles.username}>{userInfo.username}</Text>
						</View>
					</TouchableOpacity>
				}
			</>
		);
	}
}

MyInfoShow.propTypes = {
	userInfo: PropTypes.object,   //用户信息
}

const styles = StyleSheet.create({
	myInfo: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
	},
	avatarContent: {
		height: 60,
		flexDirection: 'row',
		alignItems: 'center',
		alignSelf: 'flex-start',
		padding: 10
	},
	avatar: {
		width: 50,
		height: 50,
		borderRadius: 25
	},
	username: {
		color: '#16a085',
		fontSize: 20
	},
	bgImage: {
		width: width,
		height: 150,
		justifyContent: 'center',
		alignItems: 'center',
	}
});

export default MyInfoShow;