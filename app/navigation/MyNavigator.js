import React, {Component} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import My from '../components/My';
import Colors from '../constants/Colors'
import MyInfoSettings from '../containers/MyInfoSettings';

const Stack = createStackNavigator();

class MyNavigator extends Component {
	render() {
		return (
			<Stack.Navigator initialRouteName="My"
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
				<Stack.Screen name="My"
							  component={My}
							  options={{
								  headerShown: false
							  }}
				/>
				<Stack.Screen name="MyInfoSettings"
							  component={MyInfoSettings}
							  options={{title: '个人设置'}}
				/>
			</Stack.Navigator>
		);
	}
}

export default MyNavigator;