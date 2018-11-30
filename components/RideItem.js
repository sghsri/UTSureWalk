
import React from 'react';
import { Image, StyleSheet, View, Text, TextInput, Button, Alert, Icon, TouchableOpacity, AsyncStorage } from 'react-native';
import * as firebase from 'firebase';
import moment from 'moment';

export default class RideItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            campus: false,
            driverid: '',
            dropoff: '',
            note: '',
            numriders: 0,
            pickup: '',
            rider: '',
            riderid: '',
            status: '',
            ride_id: '',
            timestamp: 0,
        }

        if (!firebase.apps.length) {
            firebase.initializeApp(ApiKeys.FirebaseConfig);
        }
    }

    componentWillMount() {
        const { campus, driverid, dropoff, note, numriders, pickup, rider, riderid, status, ride_id, timestamp } = this.props

        this.setState({ campus, driverid, dropoff, note, numriders, pickup, rider, riderid, status, ride_id, timestamp })
    }

    componentWillReceiveProps(nextProps) {
        const { campus, driverid, dropoff, note, numriders, pickup, rider, riderid, status, ride_id, timestamp } = nextProps

        this.setState({ campus, driverid, dropoff, note, numriders, pickup, rider, riderid, status, ride_id, timestamp })
    }



    async onPickup() {
        Alert.alert('Pick Up!')

        try {
            const retrievedItem = await AsyncStorage.getItem("@User");
            const item = JSON.parse(retrievedItem);

            firebase.database().ref('rides/' + this.state.ride_id).update({
                driverid: item.eid,
                status: 2
            }).then(() => { }, (error) => { Alert.alert(error.message) });

        } catch (error) {
            console.log(error.message);
        }

    }

    onNoShow() {
        Alert.alert('No Show!')

        try {
            firebase.database().ref('rides/' + this.state.ride_id).update({
                status: 5
            }).then(() => { }, (error) => { Alert.alert(error.message) });

        } catch (error) {
            console.log(error.message);
        }
    }

    getFormattedTime() {
        //times 1000 because the timestamp is floored to the second
        return moment((this.state.timestamp * 1000)).fromNow();
    }

    render() {
        return (
            <View style={styles.rideItemComponent}>
                <View style={styles.topBar}>
                    <Text style={styles.topBarText}>{this.state.rider} | {this.getFormattedTime()}</Text>
                    <View style={styles.handView}>
                        <Image source={require('../assets/images/HandicapTemp.png')} style={styles.handicap} />
                    </View>
                </View>
                <View style={styles.locations}>
                    <Image source={require('../assets/images/TravelDotsTemp.png')} style={styles.locationImage} />
                    <View style={styles.locationTexts}>
                        <Text numberOfLines={1} style={styles.locationTextInd}>{this.state.pickup}</Text>
                        <Text numberOfLines={1} style={styles.locationTextInd}>{this.state.dropoff}</Text>
                    </View>
                </View>
                <View style={styles.buttonView}>
                    <TouchableOpacity style={styles.outlinedButton} color='#E87636' title='Pick Up' onPress={this.onPickup.bind(this)}>
                        <Text style={styles.buttonText}>Pick Up</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.outlinedButton} color='#E87636' title='No Show' onPress={this.onNoShow.bind(this)}>
                        <Text style={styles.buttonText}>No Show</Text>
                    </TouchableOpacity>
                </View>
            </View>

        )
    }

}

const styles = StyleSheet.create({
    rideItemComponent: {
        borderRadius: 20,
        backgroundColor: '#fff',
        paddingTop: '3%',
        paddingBottom: '9%',
        marginBottom: '5%',
    },
    buttonView: {
        flex: 1,
        flexDirection: 'row',
        marginTop: 10,
        marginLeft: '4%',
        marginRight: '4%',
        marginBottom: '5%',
    },
    outlinedButton: {
        flex: 1,
        backgroundColor: '#fff',
        borderRadius: 15,
        borderWidth: 1,
        margin: 5,
        borderColor: '#E87636',
        padding: 1,
        justifyContent: "center", alignItems: "center"
    },
    buttonText: {
        textAlign: 'center',
        fontSize: 15,
        fontWeight: '600',
        color: '#E87636',
        textAlignVertical: "center", textAlign: "center",
    },
    topBar: {
        flexDirection: 'row',
        flex: 1,
        alignContent: 'space-between',
        paddingLeft: '5%',
        marginBottom: '2%',
    },
    topBarText: {
        flex: 6,
        fontFamily: 'libre-franklin-bold',
        color: '#AEB3BE',
    },
    handView: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        alignContent: 'flex-end',
    },
    handicap: {
        height: '100%',
        width: '100%',
        resizeMode: 'contain',
    },
    locations: {
        flexDirection: 'row',
        flex: 2,
        marginBottom: '2%',
        paddingLeft: '2%',
        paddingRight: '5%'

    },
    locationTexts: {
        flex: 1,
        justifyContent: 'space-around',
    },
    locationTextInd: {
        fontFamily: 'libre-franklin',
        fontSize: 18,
    },
    locationImage: {
        flex: .1,
        height: '100%',
        width: '100%',
        resizeMode: 'contain',

    }
});
