import React from 'react';
import { Image, ImageBackground, TextInput, Platform, AsyncStorage, ScrollView, Alert, StyleSheet, Text, TouchableOpacity, View, Button } from 'react-native';
import { WebBrowser } from 'expo';


import t from 'tcomb-form-native';

const cheerio = require('react-native-cheerio')
const Form = t.form.Form;

const User = t.struct({
  name: t.String,
  eid: t.String,
  phone: t.Number,
});


export default class LoginScreen extends React.Component {
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
    const { navigate } = this.props.navigation;
    const value = this._form.getValue(); // use that ref to get the form value
    if (value) {
      var eid = value.eid.toLowerCase().trim();
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
              this.openAlert('Invalid EID', 'Could not find a student with that EID');
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
                .then((myJson) => {
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
                  } else {
                    throw ('EID Already Exists', 'An Account with that EID has already been created');
                  }
                }).then(function (renavigate) {
                  console.log("nav");
                  navigate('Rider', {});
                  console.log("navigated");
                }).catch((title, message) => {
                  this.openAlert(title, message);
                });
            }
          } else {
            this.openAlert('Invalid EID', 'Could not find a student with that EID');
          }
        });
      } else {
        this.openAlert('Invalid EID', 'Could not find a student with that EID');
      }
    } else {
      this.openAlert('Invalid EID', 'Could not find a student with that EID');
    }
  }

  openAlert(title, message) {
    console.log('hello');
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
      <ImageBackground source={require('../assets/images/Fade.png')} style={styles.containerImg}>
        <View style={styles.container}>
          <Image source={require('../assets/images/surewalk.png')} style={styles.logo} />

          <Form ref={c => this._form = c} type={User} options={options} />
          <Button
            title="Start Walking Surely"
            color="#fff"
            fontSize="10"
            fontFamily='libre-franklin'
            buttonStyle={styles.button}
            onPress={this.handleSubmit}
          />
        </View>
      </ImageBackground>
    );
  }
}

t.form.Form.stylesheet.textbox.normal.color = 'white';
t.form.Form.stylesheet.textbox.error.color = 'white';

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
      color: 'white',
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
    backgroundColor: "white",
    position: 'absolute',
    bottom: 0,
    margin: 20,
    marginTop: 30,
    padding: 10,
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
  }


});
