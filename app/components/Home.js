import React from 'react';
import { View, Button, Text} from 'react-native';
import PropTypes from 'prop-types';

class Home extends React.Component{
	constructor(props) {
		super(props);
	}

	render(){
		return (
			<View>
				<Text>home</Text>
			</View>
		);
	}
}

Home.propTypes = {
}
export default Home;