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
            .forEach(rider => {
              if(data[rider].status == "queued") {
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

        //const { campus, driverid, dropoff, note, numriders, pickup, rider, riderid, status } = item
        
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
