import React, {Component} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Colors from '../constants/Colors'
import Ax from '../containers/Ax';
const Stack = createStackNavigator();

class AxNavigator extends Component {
	render() {
		return (
			<Stack.Navigator initialRouteName="Ax"
							 screenOptions={{
								 headerStyle: {
									 backgroundColor: Colors.tintColor
								 },
								 headerTintColor: '#fff',
								 headerTitleStyle: {
									 fontWeight: 'bold',
								 },
								 headerTitleAlign: 'center'
							 }}>
				<Stack.Screen name="Ax"
							  component={Ax}
							  options={{
								  title: '斧头',
							  }} />

			</Stack.Navigator>
		);
	}
}

export default AxNavigator;