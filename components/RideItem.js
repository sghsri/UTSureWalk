
import React from 'react';
import {StyleSheet, View, Text, TextInput, Button, Alert, Icon, TouchableOpacity} from 'react-native';
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
      status: ''
    }
  }
 
  componentWillMount() {
      const { campus, driverid, dropoff, note, numriders, pickup, rider, riderid, status } = this.props
 
      this.setState({ campus, driverid, dropoff, note, numriders, pickup, rider, riderid, status })
  }
 
  componentWillReceiveProps(nextProps) {
      const { campus, driverid, dropoff, note, numriders, pickup, rider, riderid, status } = nextProps
 
      this.setState({ campus, driverid, dropoff, note, numriders, pickup, rider, riderid, status })
  }
 
  render() {
      return(
        <View>
            <Text>{this.state.rider}</Text>
            <Text>     Pickup: {this.state.pickup} -> Dropoff: {this.state.dropoff}</Text>
            <Text>     Pickup    No Show</Text>
            <Text>     Note: {this.state.note}</Text>
            <Text>     Showroute    Remove from queue</Text>
        </View>
    )
  }
 
}