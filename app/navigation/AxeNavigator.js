import React, {Component} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Axe from '../components/Axe';
import Colors from '../constants/Colors'

const Stack = createStackNavigator();

class AxeNavigator extends Component {
	render() {
		return (
			<Stack.Navigator initialRouteName="Axe"
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
				<Stack.Screen name="Axe"
							  component={Axe}
							  options={{
								  title: '斧头',
							  }}/>
			</Stack.Navigator>
		);
	}
}

export default AxeNavigator;