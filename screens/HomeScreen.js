import React from 'react';
import {Image, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View, Button} from 'react-native';
import { WebBrowser } from 'expo';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  render() {
    const { navigate } = this.props.navigation;

    return (
      <View style={styles.container}>
      <Image source={ require('../assets/images/surewalk.png')} style={styles.logo}/>
        <Button title='Rider' color="#841584" onPress={() =>
          navigate('Rider', {})
        } />
        <Button title='Driver' onPress={() =>
          navigate('DriverBeginRideScreen', {})
        } />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  logo: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'contain'
  },
});
