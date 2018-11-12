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
        <View style={styles.outlinedButton}>
            <Button title='Rider' color='#E87636' onPress={() => navigate('Rider', {})} />
        </View>
        <View style={styles.outlinedButton}>
            <Button title='Driver' color='#E87636' onPress={() => navigate('DriverQueue', {})} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
      
  },
  logo: {
    flex: .75,
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  outlinedButton: {
      backgroundColor: '#fff',
      borderRadius: 15,
      borderWidth: 1,
      borderColor: '#E87636',
      marginLeft: '10%',
      marginRight: '10%',
      marginTop: '2%',
      marginBottom: '2%',
      paddingBottom: '1%',
    
  },
    
    
});



