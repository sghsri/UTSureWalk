import React from 'react';
import {Image,Platform,ScrollView,StyleSheet,Text,TouchableOpacity,View,FlatList,Button} from 'react-native';
import { WebBrowser } from 'expo';
import ApiKeys from '../constants/ApiKeys'
import * as firebase from 'firebase';

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
      .child("queue")
      .once("value", snapshot => {
        const data = snapshot.val()
        if (snapshot.val()) {
          const initRiders = [];
          Object
            .keys(data)
            .forEach(rider => initRiders.push(data[rider]));
          this.setState({
            riders: initRiders
          })
        }
      });

    firebase
      .database()
      .ref()
      .child("queue")
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

  render() {

    const { navigate } = this.props.navigation;

    return (

      <View style={{styles.container}}>
        <Button title= "< Home" onPress={() =>
            navigate('Main', {})
            } />
        <Text>Driver Queue</Text>

        <FlatList data={this.state.riders}
          renderItem={
            ({item}) =>
            <View style={styles.listItemContainer}>
              <Text style={styles.listItem}>
                {item}
              </Text>
            </View>
          }
          />
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
});
