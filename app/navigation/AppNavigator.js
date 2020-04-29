import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import BottomTabNavigator from './BottomTabNavigator';
import LoginNavigator from './LoginNavigator';
const Stack = createStackNavigator();

function MyDrawer() {
	return (
		<NavigationContainer>
			<Stack.Navigator initialRouteName="BottomTabNavigator" >
				<Stack.Screen name="BottomTabNavigator"
							  component={BottomTabNavigator}
							  options={{
								  headerShown: false
							  }} />
				<Stack.Screen name="LoginNavigator"
							  component={LoginNavigator}
							  options={{
								  title: '',
							  }} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}
export default MyDrawer;