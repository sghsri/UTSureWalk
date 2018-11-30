import React from 'react';
import { Image, ActivityIndicator, ImageBackground, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View, FlatList, Button } from 'react-native';
import { WebBrowser } from 'expo';
import ApiKeys from '../constants/ApiKeys'
import * as firebase from 'firebase';
import RideItem from '../components/RideItem'
import Communications from 'react-native-communications';

export default class DriverQueueScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      riders: [],
      refresh: false,
      loading: true,
      loadingmargin: {

      }
    }

    if (!firebase.apps.length) {
      firebase.initializeApp(ApiKeys.FirebaseConfig);
    }
  }

  startLoading() {
    this.setState({
      loadingmargin: {
        elevation: 2,
        marginTop: '100%',
        marginBottom: '10%',
        alignSelf: 'center',
        position: 'absolute'
      },
      loading: true
    })
  }

  stopLoading() {
    this.setState({
      loadingmargin: {
        margin: '0%',
        alignSelf: 'center',
        position: 'absolute'
      },
      loading: false
    })
  }
  componentDidMount() {
    this.startLoading();
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
          this.stopLoading();
        }
      });

    firebase
      .database()
      .ref()
      .child("rides")
      .on("child_added", snapshot => {
        this.startLoading();
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
          this.stopLoading();
          this.setState({
            refresh: !this.state.refresh,
          })
        }
      })

    firebase
      .database()
      .ref()
      .child("rides")
      .on("child_changed", snapshot => {
        console.log(snapshot);
        this.startLoading();
        const initRiders = [];
        this.state.riders.forEach(function (value) {
          console.log(value);
          if (value.ride_id != snapshot.key) {
            initRiders.unshift(value);
          }
        });
        const data = snapshot.val();
        if (data) {
          if ((data.status == 2 || data.status == 1) && !data.driverid) {
            var val = {
              campus: data.campus,
              driverid: data.driverid,
              dropoff: data.dropoff,
              note: data.note,
              numriders: data.numriders,
              pickup: data.pickup,
              rider: data.User._55.name,
              riderid: data.riderid,
              status: data.status,
              timestamp: data.timestamp,
              phone: data.phone,
              ride_id: snapshot.key
            };
            initRiders.unshift(val);
          }
        }
        this.setState({
          riders: initRiders,
          refresh: !this.state.refresh
        })
        this.stopLoading();
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
          <Text style={styles.title}>Queued Ride Requests</Text>
          <ActivityIndicator animating={this.state.loading} style={this.state.loadingmargin} size="large" color="#fff">
          </ActivityIndicator>
          <Text style={styles.emptytext}>{this.state.riders.length == 0 && !this.state.loading ? "No Rides in Queue" : ""}</Text>
          <FlatList
            style={{ borderWidth: 3, elevation: 1, borderColor: 'white', borderRadius: 20, padding: 15, }}
            data={this.state.riders}
            extraData={this.state.refresh}
            renderItem={this.renderItem}
            keyExtractor={(item, index) => item.ride_id}
          />
          <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
            <TouchableOpacity style={styles.button} title="" onPress={() => navigate('Rider', {})}>
              <Text style={styles.buttonTxt}>Ride</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} title="Driver ->" onPress={() => {
              Communications.phonecall('5122329255', true);
            }
            }>
              <Text style={styles.buttonTxt}>Contact</Text>
            </TouchableOpacity>
          </View>

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
  title: {
    color: 'white',
    padding: 10,
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 10,
    fontSize: 25,
    fontWeight: '600'
  },
  emptytext: {
    color: 'white',
    padding: 10,
    textAlign: 'center',
    marginTop: '100%',
    elevation: 1,
    marginBottom: 10,
    position: 'absolute',
    alignSelf: 'center',
    fontSize: 20,
    fontWeight: '600'
  },
  buttonView: {
    flexDirection: 'row',
    marginLeft: '4%',
    marginRight: '4%',
  },
  button: {
    backgroundColor: 'white',
    margin: 20,
    padding: 10,
    width: '40%',
    alignSelf: 'center',
    marginBottom: 5,
    marginTop: 50,
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
