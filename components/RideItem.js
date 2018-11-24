
import React from 'react';
import {StyleSheet, View, Text, TextInput, Button, Alert, Icon, TouchableOpacity, AsyncStorage} from 'react-native';
import * as firebase from 'firebase';

export default class RideItem extends React.Component {
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

    if (!firebase.apps.length) {
      firebase.initializeApp(ApiKeys.FirebaseConfig);
    }
  }

  componentWillMount() {
      const { campus, driverid, dropoff, note, numriders, pickup, rider, riderid, status, ride_id } = this.props

      this.setState({ campus, driverid, dropoff, note, numriders, pickup, rider, riderid, status, ride_id })
  }

  componentWillReceiveProps(nextProps) {
      const { campus, driverid, dropoff, note, numriders, pickup, rider, riderid, status, ride_id } = nextProps

      this.setState({ campus, driverid, dropoff, note, numriders, pickup, rider, riderid, status, ride_id })
  }



async onPickup() {
  Alert.alert('Pick Up!')

  try {
    const retrievedItem = await AsyncStorage.getItem("@User");
    const item = JSON.parse(retrievedItem);

    firebase.database().ref('rides/' + this.state.ride_id).update({
      driverid: item.eid,
      status: 2}).then(() => {}, (error) => {Alert.alert(error.message)});

  } catch (error) {
    console.log(error.message);
  }

}

onNoShow() {
  Alert.alert('No Show!')

  try {
    firebase.database().ref('rides/' + this.state.ride_id).update({
      status: 3}).then(() => {}, (error) => {Alert.alert(error.message)});

  } catch (error) {
    console.log(error.message);
  }
}


  render() {
      return(
        <View style={styles.rideItemComponent}>
            <Text>{this.state.rider}</Text>
            <Text>     Pickup: {this.state.pickup} -> Dropoff: {this.state.dropoff}</Text>
            <View style={styles.buttonView}>
                <View style={styles.outlinedButton}>
                    <Button color='#E87636' title='Pick Up' onPress={this.onPickup.bind(this)}/>
                </View>
                <View style={styles.outlinedButton}>
                    <Button color='#E87636' title='No Show' onPress={this.onNoShow.bind(this)}/>

                </View>
            </View>
            <Text>     Note: {this.state.note}</Text>
            <Text>     Showroute    Remove from queue</Text>
            <Text>     ID: {this.state.ride_id}</Text>
        </View>
    )
  }

}

const styles = StyleSheet.create({

  rideItemComponent: {
      borderRadius: 15,
      backgroundColor: '#fff',
      paddingTop: '5%',
      paddingLeft: '5%',
      paddingRight: '5%',
      paddingBottom: '10%',
      marginBottom: '5%',
  },
  buttonView: {
      flex: .25,
      flexDirection: 'row',
      paddingBottom: '1%',
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
      paddingBottom: '1%',

  },
});
