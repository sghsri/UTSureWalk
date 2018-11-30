import React from 'react';
import { Image, ImageBackground, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View, FlatList, Button, AsyncStorage } from 'react-native';
import { WebBrowser } from 'expo';
import ApiKeys from '../constants/ApiKeys'
import * as firebase from 'firebase';
import Communications from 'react-native-communications';
import MyRiderItem from '../components/MyRiderItem'



export default class DriverRidersScreen extends React.Component {
  constructor(props) {
    super(props);
    this.mydriverid = '';
    this.state = {
      riders: [],
      refresh: true
    }

    if (!firebase.apps.length) {
      firebase.initializeApp(ApiKeys.FirebaseConfig);
    }

  }

  async componentDidMount() {
    try {
      const retrievedItem = await AsyncStorage.getItem("@User");
      const item = JSON.parse(retrievedItem);
      this.mydriverid = item.eid;
    } catch (error) {
      console.log(error.message);
    }

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
            .forEach(ride_key => {
              if (data[ride_key].driverid == this.mydriverid && data[ride_key].status == 2) {
                initRiders.unshift({
                  campus: data[ride_key].campus,
                  driverid: data[ride_key].driverid,
                  dropoff: data[ride_key].dropoff,
                  note: data[ride_key].note,
                  numriders: data[ride_key].numriders,
                  pickup: data[ride_key].pickup,
                  rider: data[ride_key].User._55.name,
                  riderid: data[ride_key].riderid,
                  status: data[ride_key].status,
                  phone: data[ride_key].User._55.phone,
                  ride_id: ride_key
                });
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
      .child("rides")
      .on("child_added", snapshot => {
        const data = snapshot.val();
        if (data && data.driverid == this.mydriverid && data.status == 2) {
          this.setState(prevState => ({
            riders: [{
              campus: data.campus,
              driverid: data.driverid,
              dropoff: data.dropoff,
              note: data.note,
              numriders: data.numriders,
              pickup: data.pickup,
              rider: data.rider,
              riderid: data.riderid,
              status: data.status,
              phone: data.phone,
              ride_id: snapshot.key
            }, ...prevState.riders]
          }))

          this.setState({
            refresh: !this.state.refresh
          })
        }
      })

    firebase
      .database()
      .ref()
      .child("rides")
      .on("child_changed", snapshot => {
        const initRiders = [];

        this.state.riders.forEach(function (value) {
          if (value.ride_id != snapshot.key) {
            initRiders.unshift(value);
          }
        });
        console.log(initRiders);
        this.setState({
          riders: initRiders
        })

        this.setState({
          refresh: !this.state.refresh
        })

      })

  }


  renderItem({ item }) {

    return (
      <MyRiderItem
        campus={item.campus}
        dropoff={item.dropoff}
        note={item.note}
        numriders={item.numriders}
        pickup={item.pickup}
        rider={item.rider}
        riderid={item.riderid}
        status={item.status}
        ride_id={item.ride_id}
        phone={item.phone}
      />
    )
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
    const { navigate } = this.props.navigation;
    return (
      <ImageBackground source={require('../assets/images/Fade.png')} style={styles.containerImg}>
        <View style={styles.container}>
          <FlatList
            style={{ borderWidth: 3, elevation: 1, borderColor: 'white', borderRadius: 20, padding: 15 }}
            data={this.state.riders}
            extraData={this.state.refresh}
            renderItem={this.renderItem}
            keyExtractor={(item, index) => item.ride_id}
          />
        </View>
      </ImageBackground>
    );
  }

}

const styles = StyleSheet.create({
  containerImg: {
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    paddingTop: '10%',
    paddingLeft: '5%',
    paddingRight: '5%',
  },
  contentContainer: {
    paddingTop: 30,
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
