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
        <Button title='Driver' onPress={() =>
          navigate('DriverQueue', {})
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
    width: 400,
    height: 400,
    resizeMode: 'contain'
  },
});
