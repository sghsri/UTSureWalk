import React from 'react';
import {Image,Platform,ScrollView,StyleSheet,Text,TouchableOpacity,View,FlatList,Button} from 'react-native';
import { WebBrowser } from 'expo';
import ApiKeys from '../constants/ApiKeys'
import * as firebase from 'firebase';
import RideItem from '../components/RideItem'

export default class DriverQueueScreen extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      riders: [],
      refresh: false
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
              if(data[ride_key].status == 1) {

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
              ride_id: snapshot.key
            }, ...prevState.riders]
          })

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
            console.log(value);
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
                driverid= {item.driverid}
                dropoff={item.dropoff}
                note={item.note}
                numriders= {item.numriders}
                pickup= {item.pickup}
                rider={item.rider}
                riderid = {item.riderid}
                status  = {item.status}
                ride_id = {item.ride_id}
            />
        )
    }

  static navigationOptions = {
    header: null,
  };




  render() {

    const { navigate } = this.props.navigation;

    return (

      <View style={styles.container}>
        <Text>Driver Queue</Text>

        <FlatList
            data={this.state.riders}
            extraData={this.state.refresh}
            renderItem={this.renderItem}
            keyExtractor={(item, index) => item.ride_id}
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
    paddingTop: '10%',
    backgroundColor: '#E87636',
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
