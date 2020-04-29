import React from 'react';
import { View, Button, Text} from 'react-native';
import PropTypes from 'prop-types';

class Axe extends React.Component{
	constructor(props) {
		super(props);
	}

	render(){
		return (
			<View>
				<Text>Axe</Text>
			</View>
		);
	}
}

Axe.propTypes = {
}
export default Axe;