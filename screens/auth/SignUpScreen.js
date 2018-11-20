import React from 'react';
import {StyleSheet, View, Text, TextInput, Button, Alert } from 'react-native';
import * as firebase from 'firebase';

export default class SignUpScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      password: "",
      passwordConfirm: "",
      eid: "",
    };
  }

  onSignUpPress = () => {
    if (this.state.password != this.state.passwordConfirm) {
      Alert.alert("Passwords do not match");
      return;
    }

    firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(
        (userCred) => {
          this.writeUserData(userCred.user.uid, this.state.firstName,
            this.state.lastName, this.state.phoneNumber,
            this.state.email, this.state.eid);
          this.props.navigation.navigate("Main");
        },
        (error) => {
          Alert.alert(error.message)
        });
  }

  onBackToLoginPress = () => {
    this.props.navigation.navigate("Login");
  }

  writeUserData = (userId, firstName, lastName, phoneNumber, email, eid) => {
    firebase.database().ref('users/' + userId).set({
      first_name: firstName,
      last_name: lastName,
      phone_number: phoneNumber,
      email: email,
      eid : eid,
      is_driver : true
    }).then(() => {}, (error) => {Alert.alert(error.message)});
  }

  render() {
    return (
      <View style={{paddingTop:20, alignItems:"center"}}>
          <Text style={{marginTop:20}}>Sign Up</Text>
          <TextInput style={{width:200, height: 40, borderWidth:1}}
              value={this.state.firstName}
              onChangeText={(text) => {this.setState({firstName: text})}}
              placeholder="first name">
          </TextInput>

          <View style={{paddingTop:10}} />

          <TextInput style={{width:200, height: 40, borderWidth:1}}
              value={this.state.lastName}
              onChangeText={(text) => {this.setState({lastName: text})}}
              placeholder="last name">
          </TextInput>

          <View style={{paddingTop:10}} />

          <TextInput style={{width:200, height: 40, borderWidth:1}}
              value={this.state.eid}
              onChangeText={(text) => {this.setState({eid: text})}}
              placeholder="UT EID"
              autoCapitalize="none"
              autoCorrect={false}/>

          <View style={{paddingTop:10}} />

          <TextInput style={{width:200, height: 40, borderWidth:1}}
              value={this.state.phoneNumber}
              onChangeText={(text) => {this.setState({phoneNumber: text})}}
              placeholder="phone number"
              keyboardType="phone-pad" />

          <View style={{paddingTop:10}} />

          <TextInput style={{width:200, height: 40, borderWidth:1}}
              value={this.state.email}
              onChangeText={(text) => {this.setState({email: text})}}
              placeholder="email"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}/>

          <View style={{paddingTop:10}} />

          <TextInput style={{width:200, height: 40, borderWidth:1}}
              value={this.state.password}
              onChangeText={(text) => {this.setState({password: text})}}
              placeholder="password"
              secureTextEntry={true}
              autoCapitalize="none"
              autoCorrect={false}/>

          <View style={{paddingTop:10}} />

          <TextInput style={{width:200, height: 40, borderWidth:1}}
              value={this.state.passwordConfirm}
              onChangeText={(text) => {this.setState({passwordConfirm: text})}}
              placeholder="confirm password"
              secureTextEntry={true}
              autoCapitalize="none"
              autoCorrect={false}/>

          <View style={{paddingTop:10}} />

          <Button title="Sign Up" onPress={this.onSignUpPress} />
          <View style={{paddingTop:10}} />
          <Button title="Back to Login" onPress={this.onBackToLoginPress} />
      </View>
    );
  }
}

const styles = StyleSheet.create({

});
