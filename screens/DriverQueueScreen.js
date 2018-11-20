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
            .forEach(ride_key => {
              if(data[ride_key].status == 1) {
                //initRiders.unshift(data[ride_key]);

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
            riders: [data, ...prevState.riders]
          })
        }
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
            renderItem={this.renderItem}
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
