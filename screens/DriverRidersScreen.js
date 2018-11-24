import React from 'react';
import {Image,Platform,ScrollView,StyleSheet,Text,TouchableOpacity,View,FlatList,Button,AsyncStorage} from 'react-native';
import { WebBrowser } from 'expo';
import ApiKeys from '../constants/ApiKeys'
import * as firebase from 'firebase';

export default class DriverRidersScreen extends React.Component {
  constructor (props) {
    super(props);
    this.mydriverid = '';
    this.state = {
      riders: [],
      refresh: false
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
              if(data[ride_key].driverid == this.mydriverid) {
                initRiders.unshift({
                  campus: data[ride_key].campus,
                  driverid: data[ride_key].driverid,
                  dropoff: data[ride_key].dropoff,
                  note: data[ride_key].note,
                  numriders: data[ride_key].numriders,
                  pickup: data[ride_key].pickup,
                  rider: data[ride_key].rider,
                  riderid: data[ride_key].riderid,
                  status: data[ride_key].status,
                  ride_id: ride_key
                });
              }
            });
          this.setState({
            riders: initRiders
          })
          this.setState({
            refresh: !this.state.refresh
          })
        }
      });

    firebase
      .database()
      .ref()
      .child("rides")
      .on("child_added", snapshot => {
        const data = snapshot.val();
        if (data && data.driverid == this.mydriverid) {
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
          const data = snapshot.val();
          const initRiders = [];

          this.state.riders.forEach(function(value){
            if (value.ride_id != data.key) {
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


  static navigationOptions = {
    header: null,
  };

  render() {
    const { navigate } = this.props.navigation;

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
              <Text style={styles.listItemSmall}>
                ID: {item.ride_id}
              </Text>
            </View>
          }
          keyExtractor={(item, index) => index.toString()}
          />
          <Button title= "< Home" onPress={() =>
              navigate('Main', {})
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
