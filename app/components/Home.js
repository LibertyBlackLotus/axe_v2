import React from 'react';
import {
	View,
	Image,
	StyleSheet,
	Dimensions,
	ScrollView,
	TouchableOpacity,
	RefreshControl
} from 'react-native';
import PropTypes from 'prop-types';

const {width, height} = Dimensions.get('window');

class Home extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			refreshing: false
		};

		this.onRefresh = this.onRefresh.bind(this);
		this.toDetail = this.toDetail.bind(this);
	}

	componentDidMount() {
		this.props.getAxList();
	}

	//下拉刷新
	onRefresh(){
		this.setState({refreshing: true});
		this.props.getAxList().then(res => {
			this.setState({refreshing: false});
		});
	}

	//跳转至详情
	toDetail(id) {
		this.props.navigation.navigate('AxDetail', {id});
	}

	render() {
		const {axList} = this.props;
		let {refreshing} = this.state;
		return (
			<ScrollView refreshControl={
				<RefreshControl refreshing={refreshing} onRefresh={this.onRefresh} />
			}>
				<View style={styles.axContent}>
					{axList.map(item => (
						<TouchableOpacity key={item._id}
										  style={styles.axImgView}
										  onPress={() => this.toDetail(item._id)}>
							<Image source={{uri: item.ax[0].url}} style={styles.axImg}/>
						</TouchableOpacity>
					))}
				</View>

			</ScrollView>
		);
	}
}

Home.propTypes = {
	axList: PropTypes.array,   //斧头列表
	getAxList: PropTypes.func, //获取斧头列表
};

const styles = StyleSheet.create({
	axContent: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		padding: 10
	},
	axImgView: {
		padding: 3
	},
	axImg: {
		width: width / 3 - 15,
		height: height / 3 - 15,
		borderRadius: 5
	}
});

export default Home;