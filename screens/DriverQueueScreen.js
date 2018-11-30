import React from 'react';
import { Image, ActivityIndicator, ImageBackground, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View, FlatList, Button } from 'react-native';
import { WebBrowser } from 'expo';
import ApiKeys from '../constants/ApiKeys'
import * as firebase from 'firebase';
import RideItem from '../components/RideItem'

export default class DriverQueueScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      riders: [],
      refresh: false,
      loading: true,
      loadingmargin: {
        marginTop: '70%'
      }
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
            .forEach(ride_key => {
              if (data[ride_key].status == 1) {
                //initRiders.unshift(data[ride_key]);
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
                  timestamp: data[ride_key].timestamp,
                  phone: data[ride_key].User._55.phone,
                  ride_id: ride_key
                });

              }
            });
          this.setState({
            riders: initRiders,
            loading: false,
          })
        }
      });

    firebase
      .database()
      .ref()
      .child("rides")
      .on("child_added", snapshot => {
        const data = snapshot.val();
        if (data) {
          this.setState(prevState => {
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
              timestamp: data.timestamp,
              phone: data.phone,
              ride_id: snapshot.key
            }, ...prevState.riders]
          })

          this.setState({
            refresh: !this.state.refresh,
            loadingmargin: {
              margin: '0%'
            }
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
      <RideItem
        campus={item.campus}
        driverid={item.driverid}
        dropoff={item.dropoff}
        note={item.note}
        numriders={item.numriders}
        pickup={item.pickup}
        rider={item.rider}
        riderid={item.riderid}
        status={item.status}
        timestamp={item.timestamp}
        ride_id={item.ride_id}
      />
    )
  }

  static navigationOptions = {
    header: null,
  };

  render() {

    const { navigate } = this.props.navigation;

    return (

      <ImageBackground source={require('../assets/images/Fade.png')} style={styles.containerImg}>

        <View style={styles.container}>
          <Button title="< Home" onPress={() =>
            navigate('Login', {})
          } />
          <Button title="< Rider Status" onPress={() =>
            navigate('RiderStatus', {})
          } />
          <ActivityIndicator animating={this.state.loading} style={this.state.loadingmargin} size="large" color="#fff" />
          <FlatList
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
});
