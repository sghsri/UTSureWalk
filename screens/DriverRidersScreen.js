import React from 'react';
import { Image, ActivityIndicator, ImageBackground, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View, FlatList, Button, AsyncStorage } from 'react-native';
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
      refresh: true,
      loading: true,
      loadingmargin: {
        marginTop: '110%',
        alignSelf: 'center',
        marginBottom: 10,
        position: 'absolute'
      }
    }
    if (!firebase.apps.length) {
      firebase.initializeApp(ApiKeys.FirebaseConfig);
    }

  }

  startLoading() {
    this.setState({
      loadingmargin: {
        marginTop: '110%',
        alignSelf: 'center',
        marginBottom: 10,
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
  async componentDidMount() {
    try {
      const retrievedItem = await AsyncStorage.getItem("@User");
      const item = JSON.parse(retrievedItem);
      this.mydriverid = item.eid;
    } catch (error) {
      console.log(error.message);
    }
    this.startLoading();
    firebase
      .database()
      .ref()
      .child("rides")
      .on("child_added", snapshot => {
        this.setState({
          riders: []
        })
        const data = snapshot.val();
        if (data && data.driverid == this.mydriverid && data.status == 2) {
          this.setState(prevState => ({
            riders: [{
              campus: data.campus,
              driverid: data.driverid,
              dropoff: data.dropoff,
              note: data.notes,
              numriders: data.numRiders,
              pickup: data.pickup,
              rider: data.rider,
              riderid: data.User._55.eid,
              status: data.status,
              phone: data.User._55.phone,
              ride_id: snapshot.key
            }, ...prevState.riders]
          }))
          this.setState({
            refresh: !this.state.refresh
          })
          this.stopLoading();
        }
      })

    firebase
      .database()
      .ref()
      .child("rides")
      .once("value", snapshot => {
        this.startLoading();
        this.setState({
          riders: []
        })
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
                  note: data[ride_key].notes,
                  numriders: data[ride_key].numRiders,
                  pickup: data[ride_key].pickup,
                  rider: data[ride_key].User._55.name,
                  riderid: data[ride_key].User._55.eid,
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
        this.stopLoading();
      });

    firebase
      .database()
      .ref()
      .child("rides")
      .on("child_changed", snapshot => {
        this.startLoading();
        const initRiders = [];

        this.state.riders.forEach(function (value) {
          if (value.ride_id != snapshot.key) {
            initRiders.unshift(value);
          }
        });
        const data = snapshot.val();
        if (data) {
          if (data.status == 2) {
            var val = {
              campus: data.campus,
              driverid: data.driverid,
              dropoff: data.dropoff,
              note: data.notes,
              numriders: data.numRiders,
              pickup: data.pickup,
              rider: data.User._55.name,
              riderid: data.User._55.eid,
              status: data.status,
              timestamp: data.timestamp,
              phone: data.User._55phone,
              ride_id: snapshot.key
            };
            initRiders.unshift(val);
          }
        }
        this.setState({
          riders: initRiders
        })

        this.setState({
          refresh: !this.state.refresh
        })
        this.stopLoading();
      })

  }

  componentWillUnmount() {
    firebase
      .database()
      .ref().off();
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
          <Text style={styles.title}>My Riders: {this.mydriverid}</Text>
          <ActivityIndicator animating={this.state.loading} style={this.state.loadingmargin} size="large" color="#fff"></ActivityIndicator>
          <Text style={styles.emptytext}>{this.state.riders.length == 0 && !this.state.loading ? "No Riders to Pickup" : ""}</Text>
          <FlatList
            style={{ borderWidth: 3, elevation: 1, borderColor: 'white', borderRadius: 20, padding: 15 }}
            data={this.state.riders}
            extraData={this.state.refresh}
            renderItem={this.renderItem}
            keyExtractor={(item, index) => item.ride_id + index}
          />
          <TouchableOpacity style={styles.button} title="Driver ->" onPress={() => navigate('Login', {})}>
            <Text style={styles.buttonTxt}>Logout</Text>
          </TouchableOpacity>
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
  phoneCall: {
    width: 25,
    height: 25,
    alignSelf: 'flex-end'
  },
});
