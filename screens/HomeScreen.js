import React from 'react';
import { Image, TextInput, Platform, AsyncStorage, ScrollView, Alert, StyleSheet, Text, TouchableOpacity, View, Button, KeyboardAvoidingView } from 'react-native';
import { WebBrowser } from 'expo';


import t from 'tcomb-form-native';

const cheerio = require('react-native-cheerio')
const Form = t.form.Form;

const User = t.struct({
  name: t.String,
  eid: t.String,
  phone: t.Number,
});


export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };
  constructor(props) {
    super(props);
    this.state = {
      text: ''
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
    const {navigate} = this.props.navigation;
    const value = this._form.getValue(); // use that ref to get the form value
    if (value) {
      var eid = value.eid.toLowerCase();
      if ((/\d/g).test(eid)) {
        var url = `https://directory.utexas.edu/index.php?q=${eid}&scope=all&submit=Search`;
        fetch(url).then((response) => {
          return response.text();
        }).then((html) => {
          const $ = cheerio.load(html);
          var isUT = $('dir_info');
          if (isUT) {
            var val = $('#results').text().replace(/\s/g, '');
            if (val.includes("SearchReturned")) {
              this.openAlert();
            } else {
              console.log("wtf");
              //type of cart, capacity of cart, isDriver, eid, name, phone number
              var user = {
                eid: eid,
                name: value.name,
                phone: value.phone,
                cart: "",
                capacity: 0,
                isDriver: 0,
              }
              this.storeItem("@User", user);
              fetch('https://react-test-79a3b.firebaseio.com/users.json')
                .then(function (response) {
                  return response.json();
                })
                .then(function (myJson) {
                  var contains = false;
                  for (var key in myJson) {
                    if (myJson.hasOwnProperty(key)) {
                      var val = myJson[key];
                      console.log(val);
                      if (val.eid === eid) {
                        contains = true;
                        break;
                      }
                    }
                  }

                  if (!contains) {
                    fetch('https://react-test-79a3b.firebaseio.com/users.json', {
                      method: 'POST',
                      body: JSON.stringify(user)
                    })
                  }
                }).then(function (renavigate) {
                 console.log("nav");
                 navigate('Rider', {});
                 console.log("navigated");
               });
            }

          } else {
            this.openAlert();
          }
        });
      }
    } else {
      this.openAlert();
    }
  }

  openAlert = () => {
    Alert.alert(
      'Invalid EID',
      'Could not find a student with that EID',
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
      <View style={styles.container}>

        <Image source={require('../assets/images/surewalk.png')} style={styles.logo} />
        <Form ref={c => this._form = c} type={User} options={options} />
        <Button
          title="Start Walking Surely"
          color="#E87636"
          fontSize="10"
          buttonStyle={styles.button}
          onPress={this.handleSubmit}
        />
      </View>
      </KeyboardAvoidingView>
    );
  }
}

const formStyles = {
  ...Form.stylesheet,
  formGroup: {
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
  controlLabel: {
    normal: {
      color: '#E87636',
      fontSize: 18,
      marginBottom: 7,
      fontWeight: '600'
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
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  logo: {
    flex: 1,
    width: '60%',
    height: '60%',
    resizeMode: 'contain',
    alignSelf: 'center'
  },
  button: {
    borderRadius: 15,
  }

});
