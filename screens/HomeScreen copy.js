import React from 'react';
import { Image, TextInput, Platform, AsyncStorage, ScrollView, Alert, StyleSheet, Text, TouchableOpacity, View, Button } from 'react-native';
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

  _storeData = async (value) => {
    try {
      await AsyncStorage.setItem('@User', value);
    } catch (error) {
      // Error saving data
    }
  }
  _retrieveData = async (key) => {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        // We have data!!
        console.log(value);
      }
    } catch (error) {
      // Error retrieving data
    }
  }
  handleSubmit = () => {
    const value = this._form.getValue(); // use that ref to get the form value
    if (value) {
      var eid = value.eid;
      if (("/\d/g").test(eid)) {
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
              this._storeData(value);
              this._retrieveData(value)
            }
          } else {
            this.openAlert();
          }
        });
      } else {

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

