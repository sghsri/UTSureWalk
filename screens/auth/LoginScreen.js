import React from 'react';
import {StyleSheet, View, Text, TextInput, Button, Alert} from 'react-native';
import * as firebase from 'firebase';

export default class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
  }

  onLoginPress = () => {
    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => {
        this.props.navigation.navigate("Main");
      }, (error) => {
        Alert.alert(error.message)
      });
  }

  onCreateAccountPress = () => {
    this.props.navigation.navigate("SignUp");
  }

  render() {
    return (
      <View style={{paddingTop:20, alignItems:"center"}}>
          <Text style={{marginTop:20}}>Login</Text>
          <TextInput style={{width:200, height: 40, borderWidth:1}}
              value={this.state.email}
              onChangeText={(text) => {this.setState({email: text})}}
              placeholder="email"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false} />

          <View style={{paddingTop:10}} />

          <TextInput style={{width:200, height: 40, borderWidth:1}}
              value={this.state.password}
              onChangeText={(text) => {this.setState({password: text})}}
              placeholder="password"
              secureTextEntry={true}
              autoCapitalize="none"
              autoCorrect={false}/>

          <View style={{paddingTop:10}} />

          <Button title="Login" onPress={this.onLoginPress} />
          <View style={{paddingTop:10}} />
          <Button title="Create Account" onPress={this.onCreateAccountPress} />
      </View>
    );
  }
}

const styles = StyleSheet.create({

});
