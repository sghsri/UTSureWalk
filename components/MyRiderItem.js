import React from 'react';
import {Image, StyleSheet, View, Text, TextInput, Button, Alert, Icon, TouchableOpacity} from 'react-native';
import * as firebase from 'firebase';
import Communications from 'react-native-communications';


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
      ride_id: '',
      phone: 0
    }

    if (!firebase.apps.length) {
      firebase.initializeApp(ApiKeys.FirebaseConfig);
    }
  }

  componentWillMount() {
      const { campus, dropoff, note, numriders, pickup, rider, riderid, status, ride_id, phone } = this.props

      this.setState({ campus, dropoff, note, numriders, pickup, rider, riderid, status, ride_id, phone })
  }

  componentWillReceiveProps(nextProps) {
      const { campus, dropoff, note, numriders, pickup, rider, riderid, status, ride_id, phone } = nextProps

      this.setState({ campus, dropoff, note, numriders, pickup, rider, riderid, status, ride_id, phone })
  }

  onDropoff() {

    firebase
      .database()
      .ref('rides/' + this.state.ride_id)
      .update({
        status: 4
      })
      .then(() => {}, (error) => {Alert.alert(error.message)});

  }

  onNoShow() {
    Alert.alert('No Show!')
  }

  onPhoneCallPress = (phoneNumber) => {
    Communications.phonecall(phoneNumber, true);
  }
   onMapPress = (dropoff) => {
    Communications.web('https://www.google.com/maps/search/?api=1&query=' + dropoff)
  }


  render() {
      return(
        <View style={styles.MyRiderComponent}>
            <View style={styles.topBar}>
                <Text style={styles.topBarText}>{this.state.rider}</Text>

                <TouchableOpacity style={styles.handView} onPress={this.onPhoneCallPress.bind(this, String(this.state.phone))}>
                <Image
                  source={require('../assets/icons/phone.png')}
                  style={styles.phoneCall}
                />
              </TouchableOpacity>

                <View style={styles.handView}>
                <Image source={require('../assets/images/HandicapTemp.png')} style={styles.handicap} />
                </View>
            </View>

            <View style={styles.locations}>
                <Image source={require('../assets/images/TravelDotsTemp.png')} style={styles.locationImage} />
                <View style={styles.locationTexts}>
                    <Text numberOfLines={1} style={styles.locationTextInd}>{this.state.pickup}</Text>
                    <Text numberOfLines={1} style={styles.locationTextInd}>{this.state.dropoff}</Text>
                </View>
            </View>

            <View style={styles.buttonView}>
                <View style={styles.outlinedButton}>
                    <Button color='#E87636' title='DropOff' onPress={this.onDropoff.bind(this)}/>
                </View>
                <View style={styles.outlinedButton}>
                    <Button color='#E87636' title='No Show' onPress={this.onNoShow}/>

                </View>
            </View>

            <View stlye={styles.infoButtons}>
              <TouchableOpacity onPress={this.onMapPress.bind(this, this.state.dropoff)}>
                <Text style={styles.infoText}>View Route</Text>
              </TouchableOpacity>
            </View>

        </View>
    )
  }

}

const styles = StyleSheet.create({

  MyRiderComponent: {
      borderRadius: 15,
      backgroundColor: '#fff',
      paddingTop: '3%',
      paddingBottom: '9%',
      marginBottom: '10%',
  },
  buttonView: {
      flex: 2,
      flexDirection: 'row',
      marginLeft: '4%',
      marginRight: '4%',
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
      paddingLeft: '2%',
      paddingRight: '5%'

  },
  locationTexts: {
      flex: 1,
      justifyContent: 'space-around',
  },
  locationTextInd: {
      fontFamily: 'libre-franklin',
      fontSize: 18,
  },
  locationImage: {
      flex: .1,
      height: '100%',
      width: '100%',
      resizeMode: 'contain',

  },
  phoneCall: {
      height: '100%',
      width: '100%',
      resizeMode: 'contain',
  },
  infoButtons: {
      paddingLeft: '5%',
  },
  infoText: {
      paddingLeft: '5%',
      fontFamily: 'libre-franklin-semibold',
      color: '#E87636',
  }

});
