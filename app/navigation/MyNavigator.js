import React, {Component} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import My from '../components/My';
import Colors from '../constants/Colors'
import MyInfoSettings from '../containers/MyInfoSettings';
import History from '../containers/History';
import Focus from '../containers/Focus';
import Collection from '../containers/Collection';

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
							  options={{title: '设置'}}
				/>
				<Stack.Screen name="History"
							  component={History}
							  options={{title: '历史'}}
				/>
				<Stack.Screen name="Focus"
							  component={Focus}
							  options={{title: '关注'}}
				/>
				<Stack.Screen name="Collection"
							  component={Collection}
							  options={{title: '收藏'}}
				/>
			</Stack.Navigator>
		);
	}
}

export default MyNavigator;