import React from 'react';
import {StyleSheet, View, Text, Button, TextInput, Alert} from 'react-native';



export default class RiderSubmissionScreen extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
     };
  }

  render() {

    const { navigate } = this.props.navigation;

    return (
      <View style = {{paddingTop:20}}>
        <Text style={{marginTop:20}}>Ride request successfully submitted</Text>
        <View style={{paddingTop:20}} />
        <Button title= "< Home" onPress={() =>
          navigate('Main', {})
        } />
      </View>
    );
  }
}

const style = StyleSheet.create({

});