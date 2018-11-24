import React from 'react';
import {Image, StyleSheet, View, Text, TextInput, Button, Alert, Icon, TouchableOpacity} from 'react-native';
import * as firebase from 'firebase';

export default class MyRiderItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      campus: false,
      driverid: '',
      dropoff: '',
      note: '',
      numriders: 0,
      pickup: '',
      rider: '',
      riderid: '',
      status: '',
      ride_id: ''
    }
  }

  componentWillMount() {
      const { campus, dropoff, note, numriders, pickup, rider, riderid, status, ride_id } = this.props

      this.setState({ campus, dropoff, note, numriders, pickup, rider, riderid, status, ride_id })
  }

  componentWillReceiveProps(nextProps) {
      const { campus, dropoff, note, numriders, pickup, rider, riderid, status, ride_id } = nextProps

      this.setState({ campus, dropoff, note, numriders, pickup, rider, riderid, status, ride_id })
  }

  onDropOff() {
    Alert.alert('DropOff!')
  }

  onNoShow() {
    Alert.alert('No Show!')
  }


  render() {
      return(
        <View style={styles.MyRiderComponent}>
            <View style={styles.topBar}>
                <Text style={styles.topBarText}>Time | {this.state.rider}</Text>
                <View style={styles.handView}>
                <Image source={require('../assets/images/HandicapTemp.png')} style={styles.handicap} />
                </View>
            </View>
            
            <View style={styles.locations}>
                <Image source={require('../assets/images/TravelDotsTemp.png')} style={styles.locationImage} />
                <View style={styles.locationTexts}>
                    <Text style={styles.locationTextInd}>Pickup: {this.state.pickup}</Text>
                    <Text style={styles.locationTextInd}>Dropoff: {this.state.dropoff}</Text>
                </View>
            </View>

            <View style={styles.buttonView}>
                <View style={styles.outlinedButton}>
                    <Button color='#E87636' title='DropOff' onPress={this.onDropoff}/>
                </View>
                <View style={styles.outlinedButton}>
                    <Button color='#E87636' title='No Show' onPress={this.onNoShow}/>

                </View>
            </View>
        </View>
    )
  }

}

const styles = StyleSheet.create({

  MyRiderComponent: {
      borderRadius: 15,
      backgroundColor: '#fff',
      paddingTop: '2%',
      paddingBottom: '5%',
      marginBottom: '10%',
  },
  buttonView: {
      flex: 2,
      flexDirection: 'row',
      marginLeft: '3%',
      marginRight: '3%',
      marginBottom: '5%',
  },
  outlinedButton: {
      flex: 1,
      backgroundColor: '#fff',
      borderRadius: 15,
      borderWidth: 1,
      borderColor: '#E87636',
      marginLeft: '2%',
      marginRight: '2%',
      marginTop: '2%',
      marginBottom: '2%',
  },
  topBar: {
      flexDirection: 'row',
      flex: 1,
      alignContent: 'space-between',
      paddingLeft: '5%',
      marginBottom: '2%',
  },
  topBarText: {
      flex: 6,
      fontFamily: 'libre-franklin-bold',
      color: '#AEB3BE',
  },
  handView: {
      flex: 1,
      justifyContent: 'flex-end',
      alignItems: 'flex-end',
      alignContent: 'flex-end',
  },
  handicap: {
      height: '100%',
      width: '100%',
      resizeMode: 'contain',
  },    
  locations: {
      flexDirection: 'row',
      flex: 2,
      marginBottom: '2%',
  },
  locationTexts: {
      justifyContent: 'space-between',
  },
  locationTextInd: {
      fontFamily: 'libre-franklin',
      fontSize: 18,
  },
  locationImage: {
      flex: .2,
      height: '100%',
      width: '100%',
      resizeMode: 'contain',

  },       
});