import React from 'react';
import {StyleSheet, Image, View, Text, TextInput, Button, Alert} from 'react-native';
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
      <View style={styles.container}>
          <Image source={ require('../../assets/images/surewalk.png')} style={styles.logo} />
          <TextInput style={styles.loginField}
              value={this.state.email}
              onChangeText={(text) => {this.setState({email: text})}}
              placeholder="email"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false} />

          <View style={{paddingTop:10}} />

          <TextInput style={styles.loginField}
              value={this.state.password}
              onChangeText={(text) => {this.setState({password: text})}}
              placeholder="password"
              secureTextEntry={true}
              autoCapitalize="none"
              autoCorrect={false}/>

          <View style={styles.buttonStyles}>
            <Button color='#E87636' title="Login" onPress={this.onLoginPress} />
          </View>
          <View style={styles.buttonStyles}>
            <Button color='#E87636' title="Create Account" onPress={this.onCreateAccountPress} />
          </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    logo: {
        width: '75%',
        height: '20%',
        resizeMode: 'contain',
        tintColor: 'white',
        marginBottom: '10%',
        marginTop: '10%',
    },
    container: {
        backgroundColor: '#E87636',
        paddingTop: 20,
        alignItems: 'center',
        height: '100%',
    },
    loginField: {
        borderBottomWidth: 1,
        borderBottomColor: '#fff',
        height: '10%',
        width: '80%',
        paddingLeft: '2%',
        marginBottom: '5%',
    },
    buttonStyles: {
        marginTop: '5%',
        height: '10%',
        width: '50%',
        paddingTop: '2%',
        paddingBottom: '0%',
        paddingLeft: '2%',
        paddingRight: '2%',
        backgroundColor: 'white',
        borderRadius: 15,
    }
});
