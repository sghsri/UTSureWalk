import React from 'react';
import {View, Button, TextInput, Text} from 'react-native';

export default class DriverBeginRideScreen extends React.Component {


  constructor (props) {
    super(props);
    this.state = {
       onOrOffCampus: "",
       numSeats: "",
    };
  }

  onOffCampusButtonPress = () => {
    this.setState({
      onOrOffCampus: "off"
    })
  }

  onOnCampusButtonPress = () => {
    this.setState({
      onOrOffCampus: "on"
    })
  }

  onDriveRequest = ( ) => {
    fetch('https://react-test-79a3b.firebaseio.com/rideRequests.json', {
      method: 'POST', 
      body: JSON.stringify({
        onOrOffCampus: this.state.onOrOffCampus, 
        numSeats: this.state.numSeats,
      })
    })

    this.props.navigation.navigate("DriverQueue");
  }

  
  render () {

    return (
      
      <View style = {{paddingTop:20}}> 
        <Button title="On Campus" onPress={this.onOnCampusButtonPress}/>,
        <View style={{paddingTop:10}} />,
        <Button title="Off Campus" onPress={this.onOffCampusButtonPress} />,
        <View style={{paddingTop:10}} />,
        <TextInput 
          style={{width:200, height: 40, borderWidth:1}}
          placeholder="passengers in cart"
          onChangeText={(text) => {this.setState({numSeats: text})}}
          autoCorrect={false} />,
        <View style={{paddingTop:10}} />,
        <Button title="Start Driving!" onPress={this.onDriveRequest} />
      </View>
    );
  }
}
