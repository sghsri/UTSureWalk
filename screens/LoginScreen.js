import React from 'react';
import { Image, ImageBackground, TextInput, Platform, AsyncStorage, ScrollView, Alert, StyleSheet, Text, TouchableOpacity, View, Button, KeyboardAvoidingView } from 'react-native';
import { WebBrowser } from 'expo';


import t from 'tcomb-form-native';
const Form = t.form.Form;

const User = t.struct({
  eid: t.String,
});


export default class LoginScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };
  constructor(props) {
    super(props);
    const { navigate } = this.props.navigation;
    this.retrieveItem('@User')
      .then((user) => {
        if (user) {
          // this.setState({loginText: `Login with ${user.eid}`}); 
          this.setState({ value: { eid: `${user.eid}` } });
        }
      })
    this.state = {
      loginText: 'Login',
      value: {
        eid: ''
      }
    };
  }

  async storeItem(key, item) {
    try {
      //we want to wait for the Promise returned by AsyncStorage.setItem()
      //to be resolved to the actual value before returning the value
      var jsonOfItem = await AsyncStorage.setItem(key, JSON.stringify(item));
      return jsonOfItem;
    } catch (error) {
      console.log(error.message);
    }
  }

  async retrieveItem(key) {
    try {
      const retrievedItem = await AsyncStorage.getItem(key);
      const item = JSON.parse(retrievedItem);
      return item;
    } catch (error) {
      console.log(error.message);
    }
    return
  }

  handleSubmit = () => {
    const { navigate } = this.props.navigation;
    const value = this._form.getValue(); // use that ref to get the form value
    if (value) {
      var eid = value.eid.toLowerCase().trim();
      if ((/\d/g).test(eid)) {
        fetch('https://react-test-79a3b.firebaseio.com/users.json')
          .then(function (response) {
            return response.json();
          })
          .then((myJson) => {
            var contains = false;
            for (var key in myJson) {
              if (myJson.hasOwnProperty(key)) {
                var user = myJson[key];
                console.log(user);
                if (user.eid === eid) {
                  contains = true;
                  this.storeItem("@User", user);
                  break;
                }
              }
            }
            return contains;
          }).then((renavigate) => {
            if (renavigate) {
              console.log("nav");
              navigate('Rider', {});
              console.log("navigated");
            } else {
              this.openAlert('No account for that EID', 'Please make an account for that EID');
            }
          }).catch((error) => {
            this.openAlert('Invalid EID', 'Please input a valid EID');
          });
      } else {
        this.openAlert('Invalid EID', 'Please input a valid EID');
      }
    } else {
      this.openAlert('Invalid EID', 'Please input a valid EID');
    }
  }

  openAlert(title, message) {
    Alert.alert(
      title,
      message,
      [
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ],
      { cancelable: false }
    )
  }
  render() {
    const { navigate } = this.props.navigation;

    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">
      <ImageBackground source={require('../assets/images/Fade.png')} style={styles.containerImg}>
        <View style={styles.container}>
          <Image source={require('../assets/images/surewalk.png')} style={styles.logo} />

          <Form ref={c => this._form = c} value={this.state.value} type={User} options={options} />


          <TouchableOpacity style={styles.button} title="Login" onPress={() => this.handleSubmit()}>
            <Text style={styles.buttonTxt}>{this.state.loginText}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.registerButton} title="Register" onPress={() => navigate('Main', {})}>
            <Text style={styles.registerText}>Make Account</Text>

          </TouchableOpacity>
        </View>
      </ImageBackground >
      </KeyboardAvoidingView>
    );
  }
}

t.form.Form.stylesheet.textbox.normal.color = 'white';

const formStyles = {
  ...Form.stylesheet,
  formGroup: {
    alignSelf: 'center',
    normal: {
      marginBottom: 10,
      marginLeft: 10,
      marginRight: 10,
    },
    error: {
      marginBottom: 10,
      marginLeft: 10,
      marginRight: 10,
    }
  },
  // textbox: {
  //   normal: {
  //     color: 'white'
  //   },
  //   error: {
  //     color: 'white'
  //   }
  // },
  controlLabel: {
    normal: {
      color: '#fff',
      fontSize: 18,
      fontFamily: 'libre-franklin',
      marginBottom: 7,
    },
    // the style applied when a validation error occours
    error: {
      color: '#F44336',
      fontSize: 18,
      marginBottom: 7,
      fontWeight: '600'
    }
  }
}

const options = {
  fields: {
    eid: {
      label: 'UT EID',
    },
    phone: {
      label: "Phone Number",
    },
  },
  stylesheet: formStyles,
}
const styles = StyleSheet.create({
  containerImg: {
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    flexDirection: 'column',
    paddingTop: 30,
    padding: 20,
  },
  logo: {
    flex: 1,
    width: '60%',
    height: '60%',
    resizeMode: 'contain',
    alignSelf: 'center',
    tintColor: 'white',
  },
  button: {
    backgroundColor: 'white',
    margin: 20,
    padding: 10,
    width: '60%',
    alignSelf: 'center',
    marginBottom: 10,
    marginRight: 5,
    borderRadius: 50
  },
  buttonTxt: {
    alignSelf: 'center',
    color: '#E87636',
    fontSize: 16,
    fontWeight: '600',
    paddingTop: 5,
    paddingBottom: 5,
  },

  registerButton: {
    backgroundColor: '#E87636',
    margin: 20,
    padding: 10,
    width: '60%',
    alignSelf: 'center',
    marginBottom: 10,
    marginRight: 5,
    borderRadius: 50
  },
  registerText: {
    alignSelf: 'center',
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    paddingTop: 5,
    paddingBottom: 5,
  }


});
