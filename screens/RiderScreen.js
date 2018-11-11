import React from 'react';
import {StyleSheet, View, Text, Button, TextInput, Alert} from 'react-native';



export default class RiderScreen extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      phone: "",
      pickup: "",
      dropoff: "",
     };
  }
  
  onRideRequest = () => {
    if(this.state.name.length == 0 || !this.state.name.trim()) {
      Alert.alert("Name cannot be empty");
      return;
    } else if(this.state.phone.length == 0 || !this.state.phone.trim()) {
      Alert.alert("Phone number cannot be empty");
      return;
    } else if(this.state.pickup.length == 0 || !this.state.pickup.trim()) {
      Alert.alert("Pickup location cannot be empty");
      return;
    } else if(this.state.pickup.length == 0 || !this.state.pickup.trim()) {
      Alert.alert("Dropoff location cannot be empty");
      return;
    }

    fetch('https://react-test-79a3b.firebaseio.com/rideRequests.json', {
      method: 'POST',
      body: JSON.stringify({
        name: this.state.name, 
        phone: this.state.phone,
        pickup: this.state.pickup,
        dropoff: this.state.dropoff,
      })
    })

    this.props.navigation.navigate("RiderSubmission");

  }

  render() {

    const { navigate } = this.props.navigation;

    return (
      <View style = {{paddingTop:20}}>
        <Button title= "< Home" onPress={() =>
          navigate('Main', {})
        } />
        <Text style={{marginTop:20}}>Rider Home!</Text>
        <TextInput style={{width:200, height: 40, borderWidth:1}}
          value={this.state.name}
          onChangeText={(text) => {this.setState({name: text})}}
          placeholder="name"
          autoCapitalize="none"
          autoCorrect={false} />

        <View style={{paddingTop:10}} />

        <TextInput style={{width:200, height: 40, borderWidth:1}}
          value={this.state.phone}
          onChangeText={(text) => {this.setState({phone: text})}}
          placeholder="phone"
          keyboardType="phone-pad"
          autoCapitalize="none"
          autoCorrect={false} />

        <View style={{paddingTop:10}} />

        <TextInput style={{width:200, height: 40, borderWidth:1}}
          value={this.state.pickup}
          onChangeText={(text) => {this.setState({pickup: text})}}
          placeholder="pickup location"
          autoCapitalize="none"
          autoCorrect={false} />

        <View style={{paddingTop:10}} />

        <TextInput style={{width:200, height: 40, borderWidth:1}}
          value={this.state.dropoff}
          onChangeText={(text) => {this.setState({dropoff: text})}}
          placeholder="dropoff location"
          autoCapitalize="none"
          autoCorrect={false} />


        <View style={{paddingTop:10}} />
        <Button title="Submit Ride Request!" onPress={this.onRideRequest} />
        <View style={{paddingTop:10}} />
        
      </View>
    );
  }
}

const style = StyleSheet.create({

});
