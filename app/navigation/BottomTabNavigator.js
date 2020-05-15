import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import * as React from 'react';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import Colors from '../constants/Colors';
import TabBarIcon from '../components/TabBarIcon';
import Home from '../navigation/HomeNavigator';
import Ax from '../navigation/AxNavigator';
import My from '../navigation/MyNavigator';

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'Home';

export default function BottomTabNavigator({navigation, route}) {
	return (
		<BottomTab.Navigator initialRouteName={INITIAL_ROUTE_NAME}
							 tabBarOptions={{
								 activeTintColor: Colors.tabIconSelected,
								 inactiveTintColor: Colors.tabIconDefault,
							 }}>
			<BottomTab.Screen
				name="Home"
				component={Home}
				options={{
					title: '首页',
					tabBarIcon: ({focused}) => <TabBarIcon focused={focused} name="home"/>,
				}}
			/>
			<BottomTab.Screen
				name="Axe"
				component={Ax}
				options={{
					title: '斧头',
					tabBarIcon: ({focused}) =>
						<MaterialCommunityIcons name="axe"
												size={25}
												color={focused ? Colors.tabIconSelected : Colors.tabIconDefault} />,
				}}
			/>
			<BottomTab.Screen
				name="My"
				component={My}
				options={{
					title: '我的',
					tabBarIcon: ({focused}) => <TabBarIcon focused={focused} name="user"/>,
				}}
			/>
		</BottomTab.Navigator>
	);
}

// function getHeaderTitle(route) {
// 	const routeName = route.state ?. routes[route.state.index] ?. name ?? INITIAL_ROUTE_NAME;
//
// 	switch (routeName) {
// 		case 'Home':
// 			return '首页';
// 		case 'Axe':
// 			return '斧头';
// 		case 'My':
// 			return '我的';
// 	}
// }
