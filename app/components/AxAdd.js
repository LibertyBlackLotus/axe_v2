import React from 'react';
import {
	View,
	Text,
	ScrollView,
	StyleSheet,
	Image,
	Alert,
	TextInput
} from 'react-native';
import {
	Button
} from 'react-native-elements';
import PropTypes from 'prop-types';
import * as ImagePicker from 'expo-image-picker';
import {getUserId} from '../utils';
import {baseUrl} from '../store/config';
import Colors from "../constants/Colors";

class AxAdd extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			image: null,
			author: '',
			title: '',
			content: '',
			cate: '5e704d38c941b8f208a5c264',
			community: '5e707298f000d3cbb4b08d75'
		}
		this.pickImage = this.pickImage.bind(this);
		this.publishAx = this.publishAx.bind(this);
		// this.handleTitleChange = this.handleTitleChange.bind(this);
		this.handleContentChange = this.handleContentChange.bind(this);
	}

	async componentDidMount() {
		let author = await getUserId();
		this.setState({author});
	}

	//选择图片
	pickImage = async () => {
		try {
			let result = await ImagePicker.launchImageLibraryAsync({
				mediaTypes: ImagePicker.MediaTypeOptions.All,
				quality: 1,
			});
			if (!result.cancelled) {
				this.setState({image: result.uri});
			}
			console.log(result);

		} catch (E) {
			console.log(E);
		}
	}

	//添加标题
	// handleTitleChange(text){
	// 	this.setState({
	// 		title: text
	// 	});
	// }

	//添加内容
	handleContentChange(text){
		this.setState({
			content: text
		});
	}

	//发布
	publishAx() {
		let { title, content, author, cate, community, image } = this.state;
		if(!image){
			Alert.alert(
				'请添加图片'
			);
			return;
		}
		if(!content){
			Alert.alert(
				'请填写内容'
			);
			return;
		}

		let form = new FormData();
		form.append('files', {
			uri: image,
			type: 'multipart/form-data',
			name: 'image.png'
		});
		fetch(`${baseUrl}upload`, {
			method: 'POST',
			body: form
		}).then((res) => {return res.json()}).then((res) => {
			console.log( 'fetch res--->', JSON.stringify(res) );
			let ax = {url: res.url, width: res.width, height: res.height};
			let params = {
				ax,
				title,
				content,
				author,
				state: 1,
				cate,
				community
			};
			this.props.addAx(params).then(res => {
				this.props.navigation.navigate('Ax');
			});
		}).catch((e) => {
			alert(e)
		});

		this.setState({
			title: '',
			content: ''
		});
	}

	render() {
		let {image, title, content} = this.state;
		return (
			<View style={styles.content}>

				{image && <Image source={{uri: image}} style={{width: 100, height: 100}}/>}
				<Button title="添加图片"
						type="outline"
						buttonStyle={styles.addAxButton}
						onPress={this.pickImage} />


				<View class="axDesc">
					<TextInput placeholder="心情状态,分享生活点滴"
							   multiline
							   style={styles.axDesc}
							   onChangeText={text => this.handleContentChange(text)}
							   value={content}>
					</TextInput>
				</View>

				{/*<View class="selectItemContent">*/}
				{/*</View>*/}
				{/*<View class="selectItem">*/}
				{/*</View>*/}

				<View style={styles.publishButtonContainer} >
					<Button title="发布" onPress={this.publishAx} buttonStyle={styles.publishButton} />
				</View>


			</View>
		);
	}
}

AxAdd.propTypes = {
	axListUser: PropTypes.array, //用户斧头列表
	addAx: PropTypes.func,       //创建斧头
}

const styles = StyleSheet.create({
	content: {
		padding: 10
	},
	addAxButton: {
		width: 100,
		height: 100
	},
	axDesc: {
		height: 200
	},
	publishButtonContainer: {
		alignItems: 'center'
	},
	publishButton: {
		width: 350,
		backgroundColor: Colors.tintColor
	}
});

export default AxAdd;