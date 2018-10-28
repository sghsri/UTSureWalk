import React from 'react';
import { createSwitchNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import DriverTabNavigator from './DriverTabNavigator';
import RiderScreen from '../screens/RiderScreen';
import HomeScreen from '../screens/HomeScreen';

export default createSwitchNavigator({
  // You could add another route here for authentication.
  // Read more at https://reactnavigation.org/docs/en/auth-flow.html
  Main: {screen : HomeScreen},
  Rider: RiderScreen,
  DriverQueue: DriverTabNavigator,
});
