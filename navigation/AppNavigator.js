import React from 'react';
import { createSwitchNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import DriverTabNavigator from './DriverTabNavigator';
import RiderScreen from '../screens/RiderScreen';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import SignUpScreen from '../screens/auth/SignUpScreen';
import RiderSubmissionScreen from '../screens/RiderSubmissionScreen';

export default createSwitchNavigator({
  // You could add another route here for authentication.
  // Read more at https://reactnavigation.org/docs/en/auth-flow.html
  Login: {screen : LoginScreen},
  SignUp: {screen : SignUpScreen},
  Main: {screen : HomeScreen},
  Rider: RiderScreen,
  DriverQueue: DriverTabNavigator,
  RiderSubmission: {screen : RiderSubmissionScreen},
});
