import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import DriverQueueScreen from '../screens/DriverQueueScreen'
import DriverRidersScreen from '../screens/DriverRidersScreen'
import LoginScreen from '../screens/auth/LoginScreen';
import SignUpScreen from '../screens/auth/SignUpScreen';

const DriverQueueStack = createStackNavigator({
  DriverQueue: DriverQueueScreen,
});

DriverQueueStack.navigationOptions = {
  tabBarLabel: 'Queue',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-car${focused ? '' : '-outline'}`
          : 'md-car'
      }
    />
  ),
};

const DriverRidersStack = createStackNavigator({
  DriverQueue: DriverRidersScreen,
});

DriverRidersStack.navigationOptions = {
  tabBarLabel: 'My Riders',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-cart${focused ? '' : '-outline'}`
          : 'md-cart'
      }
    />
  ),
};

const HomeStack = createStackNavigator({
  Home: HomeScreen,
});

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-home${focused ? '' : '-outline'}`
          : 'md-home'
      }
    />
  ),
};


export default createBottomTabNavigator({
  DriverQueueStack,
  DriverRidersStack,

});
