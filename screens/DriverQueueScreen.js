import React from 'react';
import {
  Image,
  ImageBackground,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  Button,
  Picker,
  TextInput,
  KeyboardAvoidingView,
  AsyncStorage,
} from 'react-native';
import Menu, { MenuContext,
  MenuProvider,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import { WebBrowser } from 'expo';
import ApiKeys from '../constants/ApiKeys';
import * as firebase from 'firebase';
import RideItem from '../components/RideItem';

export default class DriverQueueScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      riders: [],
      refresh: false,
    };

    if (!firebase.apps.length) {
      firebase.initializeApp(ApiKeys.FirebaseConfig);
    }
  }

  componentDidMount() {
    firebase
      .database()
      .ref()
      .child('rides')
      .once('value', snapshot => {
        const data = snapshot.val();
        if (snapshot.val()) {
          const initRiders = [];
          Object.keys(data).forEach(ride_key => {
            if (data[ride_key].status == 1) {
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
                ride_id: ride_key,
              });
            }
          });
          this.setState({
            riders: initRiders,
          });
        }
      });

    firebase
      .database()
      .ref()
      .child('rides')
      .on('child_added', snapshot => {
        const data = snapshot.val();
        if (data) {
          this.setState(prevState => {
            riders: [
              {
                campus: data.campus,
                driverid: data.driverid,
                dropoff: data.dropoff,
                note: data.note,
                numriders: data.numriders,
                pickup: data.pickup,
                rider: data.rider,
                riderid: data.riderid,
                status: data.status,
                ride_id: snapshot.key,
              },
              ...prevState.riders,
            ];
          });

          this.setState({
            refresh: !this.state.refresh,
          });
        }
      });

    firebase
      .database()
      .ref()
      .child('rides')
      .on('child_changed', snapshot => {
        const data = snapshot.val();
        const initRiders = [];

        this.state.riders.forEach(function(value) {
          if (value.ride_id != data.key) {
            initRiders.unshift(value);
          }
        });

        this.setState({
          riders: initRiders,
        });

        this.setState({
          refresh: !this.state.refresh,
        });
      });
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
        ride_id={item.ride_id}
      />
    );
  }

  static navigationOptions = {
    header: null,
  };

  render() {
    const { navigate } = this.props.navigation;

    return (
      <ImageBackground
        source={require('../assets/images/Fade.png')}
        style={styles.containerImg}>
        <View style={styles.container}>
          <Button title="< Home" onPress={() => navigate('Main', {})} />
          <FlatList
            data={this.state.riders}
            extraData={this.state.refresh}
            renderItem={this.renderItem}
            keyExtractor={(item, index) => item.ride_id}
          />

          <MenuContext>
            <MenuProvider
              skipInstanceCheck
              style={{
                flexDirection: 'column',
                padding: 50,
                backgroundColor: 'white',
              }}>
              <Menu>
                <MenuTrigger
                  style={{
                    fontSize: 26,
                    color: 'orange',
                    alignItems: 'center',
                  }}
                  text="Manage Settings"
                />
                <MenuOptions>
                  <ScrollView style={{ maxHeight: 250 }}>
                    <MenuOption>
                      <Text
                        style={{
                          flexDirection: 'column',
                          padding: 15,
                          backgroundColor: '#e76823',
                          color: 'white',
                        }}>
                        Name: {this.state.user_name}
                      </Text>
                      <Text
                        style={{
                          flexDirection: 'column',
                          padding: 15,
                          backgroundColor: '#e76823',
                          color: 'white',
                        }}>
                        Phone Number: {this.state.phone_number}
                      </Text>
                      <TextInput
                        style={{
                          flexDirection: 'column',
                          padding: 15,
                          backgroundColor: '#e76823',
                          color: 'white',
                        }}
                        placeholder="Edit phone number"
                        onChangeText={text =>
                          this.storeItem(
                            (this.key: phoneNumber),
                            (this.value: text)
                          )
                        }
                      />
                    </MenuOption>
                    <MenuOption>
                      <TextInput
                        style={{
                          flexDirection: 'column',
                          padding: 15,
                          backgroundColor: '#e76823',
                          color: 'white',
                        }}
                        placeholder="Edit ADA accomodation settings"
                        onChangeText={text =>
                          this.storeItem((this.key: notes), (this.value: text))
                        }
                      />
                    </MenuOption>
                    <MenuOption>
                      <Button
                        onPress={() =>
                          fetch(
                            'https://react-test-79a3b.firebaseio.com/rides.json',
                            {
                              method: 'POST',
                              body: JSON.stringify(this.state),
                            }
                          )
                        }
                        title="Save"
                        color="#c96f00"
                      />
                    </MenuOption>
                    <MenuOption>
                      if (await retrieveItem(isDriver)) != 0
                      {
                        <Button
                          title="Driver >"
                          onPress={() => navigate('DriverQueue', {})}
                        />
                      }
                    </MenuOption>
                    <MenuOption>
                      <Button
                        title="Rider >"
                        onPress={() => navigate('Rider', {})}
                      />
                    </MenuOption>
                  </ScrollView>
                </MenuOptions>
              </Menu>
            </MenuProvider>
          </MenuContext>
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
});
