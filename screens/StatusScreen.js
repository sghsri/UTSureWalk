import React, {Component} from 'react';
import {Image, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View, Button, AsyncStorage} from 'react-native';
import * as firebase from 'firebase';
import { relative } from 'path';

export default class StatusScreen extends React.Component {
    constructor(props) {
        super(props);
        
        
        if (!firebase.apps.length) {
            firebase.initializeApp(ApiKeys.FirebaseConfig);
        }
        // need to clear timer
        
        // database stuff

        this.riderid = this.retrieveItem('@User');
        this.state = {
            User: riderid,
            timestamp: Math.floor(Date.now() / 1000),
            pickup: '',
            dropoff: '',
            notes: '',
            numRiders: '',
            driverID: 0,
            onCampus: this.onCampus(),
            status: 1,

            message: 0
        }

        
        setInterval(() => (
            this.setState(previousState => (
                { message: (previousState.message + 1) % 4}
            ))
        ), 850);
    };

    // componentDidUpdate occurs during re-rendering
    componentDidUpdate() {
        // Get a database reference to our posts
        firebase
            .database()
            .ref()
            .child("rides")
            .on("child_changed", snapshot => {
                var data = snapshot.val();
                if (data) {
                    var currentStatus;
                    Object
                        .keys(data)
                        .forEach(rider => {
                            if (data[rider].riderid == this.riderid) {
                                currentStatus = data[rider].status;
                            }
                        });
                    this.setState({
                        status: currentStatus
                    })
                }
            });
    }

    render() {
        const { navigate } = this.props.navigation;
        
        // This is REALLY BAD style, needs complete refactoring
      
        return (
            <View style={styles.container}>
                <View style={styles.image}>
                    <Image style={styles.image} source={require('../assets/images/wave.png')}/>
                </View>
                <Button title='Rider' color="#841584" onPress={() =>
                    navigate('Rider', {})
                } />
                <Text style={styles.paragraph}>Finding your ride.</Text>
            </View>
        )
        
        // else if (this.state.message == 1) {
        //     return (
        //         <View style={styles.container}>
        //         <Button title='Rider' color="#841584" onPress={() =>
        //             navigate('Rider', {})
        //         } />
        //             <Text style={styles.paragraph}>Finding your ride..</Text>
        //         </View>
        //     )
        // }
        // else if (this.state.message == 2) {
        // return (
        //     <View style={styles.container}>
        //         <Button title='Rider' color="#841584" onPress={() =>
        //             navigate('Rider', {})
        //         } />
        //         <Text style={styles.paragraph}>Finding your ride...</Text>
        //     </View>
        // )
        //     }
        // else if (this.state.message == 3) {
        //     return (
        //         <View style={styles.container}>
        //         <Button title='Rider' color="#841584" onPress={() =>
        //             navigate('Rider', {})
        //         } />
        //             <Text style={styles.paragraph}>Finding your ride</Text>
        //         </View>
        //     )
        // }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'stretch',
        justifyContent: 'center',
        backgroundColor: '#ffffff'
      },
    wave: {
        position: 'relative',
        width: "100%",
        aspectRatio: 3 / 5,
        backgroundColor: '#E87636'
      },
    image: {
      flexGrow:1,
      height:null,
      width:null,
      alignItems: 'center',
      justifyContent:'center',
    },
    paragraph: {
      textAlign: 'center',
      color: 'white',
      justifyContent: 'center',
      alignItems: 'center',
      fontSize: 36  // might need to declare as global variable
    },
  });