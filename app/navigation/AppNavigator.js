import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import BottomTabNavigator from './BottomTabNavigator';
import LoginNavigator from './LoginNavigator';
import AxDetail from "../containers/AxDetail";
import UserMainPage from "../containers/UserMainPage";
import AxAdd from "../containers/AxAdd";
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
				<Stack.Screen name="AxDetail"
							  component={AxDetail}
							  options={{
								  title: '详情',
								  headerShown: false
							  }} />
				<Stack.Screen name="UserMainPage"
							  component={UserMainPage}
							  options={{
								  title: '个人主页',
								  headerShown: false
							  }} />
				<Stack.Screen name="AxAdd"
							  component={AxAdd}
							  options={{
								  title: '创建',
							  }} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}
export default MyDrawer;