import React from 'react';
import {Image,Platform,ScrollView,StyleSheet,Text,TouchableOpacity,View,FlatList,Button} from 'react-native';
import { WebBrowser } from 'expo';
import ApiKeys from '../constants/ApiKeys'
import * as firebase from 'firebase';
import Communications from 'react-native-communications';


export default class DriverRidersScreen extends React.Component {
  constructor (props) {
    super(props);
    this.mydriverid = "101";
    this.state = {
      riders: []
    }

    if (!firebase.apps.length) {
      firebase.initializeApp(ApiKeys.FirebaseConfig);
    }
  }

  componentDidMount() {
    firebase
      .database()
      .ref()
      .child("rides")
      .once("value", snapshot => {
        const data = snapshot.val()
        if (snapshot.val()) {
          const initRiders = [];
          Object
            .keys(data)
            .forEach(rider => {
              if(data[rider].driverid == this.mydriverid) {
                initRiders.unshift(data[rider]);
              }
            });
          this.setState({
            riders: initRiders
          })
        }
      });

    firebase
      .database()
      .ref()
      .child("current_riders")
      .on("child_added", snapshot => {
        const data = snapshot.val();
        if (data) {
          this.setState(prevState => ({
            riders: [data, ...prevState.riders]
          }))
        }
      })

  }

  static navigationOptions = {
    header: null,
  };

  onPhoneCallPress = (phoneNumber) => {
    Communications.phonecall(phoneNumber, true);
  }

  onMapPress = (dropoff) => {
    Communications.web('https://www.google.com/maps/search/?api=1&query=' + dropoff)
  }

  render() {
    const {navigate} = this.props.navigation;
    return (

      <View style={styles.container}>
        <Text>My Riders</Text>

        <FlatList data={this.state.riders}
          renderItem={
            ({item}) =>
            <View style={styles.listItemContainer}>
              <Text style={styles.listItem}>
                {item.rider}
              </Text>
              <Text style={styles.listItemSmall}>
                Status: {item.status}
              </Text>
              <Text style={styles.listItemSmall}>
                Dropoff: {item.dropoff}
              </Text>
              <TouchableOpacity onPress={this.onPhoneCallPress.bind(this, String(item.phone))}>
                <Image
                  source={require('../assets/icons/phone.png')}
                  fadeDuration={0}
                  style={styles.phoneCall}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={this.onMapPress.bind(this, item.dropoff)}>
                <Image
                  source={require('../assets/icons/map.png')}
                  fadeDuration={0}
                  style={styles.phoneCall}
                />
              </TouchableOpacity>
            </View>
          }
          keyExtractor={(item, index) => index.toString()}
          />
          <Button title= "< Home" onPress={() =>
              navigate('Rider', {})
              } />
      </View>

    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  listItemContainer: {
    backgroundColor: '#fff',
    margin: 5,
    borderRadius: 5
  },
  listItem: {
    fontSize: 20,
    padding: 10
  },
  listItemSmall: {
    fontSize: 15,
    padding: 10
  },
  phoneCall: {
    width: 25,
    height: 25,
    alignSelf: 'flex-end'
  },
});
