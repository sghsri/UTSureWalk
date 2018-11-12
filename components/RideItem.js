
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
    
  onPickup() {
    Alert.alert('Pick Up!')
  }
    
  onNoShow() {
    Alert.alert('No Show!')
  }

 
  render() {
      return(
        <View style={styles.rideItemComponent}>
            <Text>{this.state.rider}</Text>
            <Text>     Pickup: {this.state.pickup} -> Dropoff: {this.state.dropoff}</Text>
            <View style={styles.buttonView}>
                <View style={styles.outlinedButton}>
                    <Button color='#E87636' title='Pick Up' onPress={this.onPickup}/>
                </View>
                <View style={styles.outlinedButton}>
                    <Button color='#E87636' title='No Show' onPress={this.onNoShow}/>
                    
                </View>
            </View>
            <Text>     Note: {this.state.note}</Text>
            <Text>     Showroute    Remove from queue</Text>
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