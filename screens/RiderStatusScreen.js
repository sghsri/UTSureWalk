import React from 'react';
import { Image, ImageBackground, TextInput, Platform, AsyncStorage, ScrollView, Alert, StyleSheet, Text, TouchableOpacity, View, Button } from 'react-native';
import { WebBrowser } from 'expo';


export default class RiderStatusScreen extends React.Component {
    static navigationOptions = {
        header: null,
    };
    constructor(props) {
        super(props);
        const { navigate } = this.props.navigation;
        this.retrieveItem('@Ride')
            .then((theride) => {
                if (theride) {
                    console.log(theride);
                    // this is extremely bad way to find the id (by the timestamp)
                    // but i guess it'll do for now
                    fetch('https://react-test-79a3b.firebaseio.com/rides.json')
                        .then(function (response) {
                            return response.json();
                        })
                        .then((myJson) => {
                            var contains = false;
                            for (var key in myJson) {
                                if (myJson.hasOwnProperty(key)) {
                                    //console.log(key);
                                    var val = myJson[key];
                                    if (val.timestamp === theride.timestamp) {
                                        console.log(key);
                                        this.setState({ ride: theride, id: key, statusText: '' });
                                        break;
                                    }
                                }
                            }
                        })
                } else {
                    //no user error reroute back to main
                }
            })
        this.state = {
            ride: '',
            id: '',
            statusText: 'hello',
        };
    }

    componentDidMount() {
        this._interval = setInterval(() => {
            this.getStatus();
        }, 2000);
    }



    async getStatus() {
        fetch('https://react-test-79a3b.firebaseio.com/rides.json')
            .then((response) => {
                return response.json();
            })
            .then((myJson) => {
                var contains = false;
                for (var key in myJson) {
                    if (myJson.hasOwnProperty(key) && key == this.state.id) {
                        var status = myJson[key].status;
                        switch (status) {
                            case 1:
                                this.setState({ statusText: 'Your Ride is in the Queue' });
                                break;
                            case 2:
                                this.setState({ statusText: 'A Driver is coming to pick you up!' });
                                break;
                            case 4:
                                this.setState({ statusText: 'Thank you for Riding with Surewalk!' });
                                break;
                            default:
                                this.setState({ statusText: 'There was an Error' });
                                break;
                        }

                    }
                }
            })
    }
    componentWillUnmount() {
        clearInterval(this._interval);
    }

    async storeItem(key, item) {
        try {
            //we want to wait for the Promise returned by AsyncStorage.setItem()
            //to be resolved to the actual value before returning the value
            var jsonOfItem = await AsyncStorage.setItem(key, JSON.stringify(item));
            return jsonOfItem;
        } catch (error) {
            console.log(error.message);
        }
    }

    async retrieveItem(key) {
        try {
            const retrievedItem = await AsyncStorage.getItem(key);
            const item = JSON.parse(retrievedItem);
            return item;
        } catch (error) {
            console.log(error.message);
        }
        return
    }


    openAlert(title, message) {
        Alert.alert(
            title,
            message,
            [
                { text: 'OK', onPress: () => console.log('OK Pressed') },
            ],
            { cancelable: false }
        )
    }
    render() {
        const { navigate } = this.props.navigation;
        return (
            <ImageBackground source={require('../assets/images/Fade.png')} style={styles.containerImg}>
                <View style={styles.container}>
                    <Text style={styles.status}>{this.state.statusText}</Text>
                    <View flexDirection='row' style={{
                        justifyContent: 'space-between'
                    }}>
                        <Text style={styles.title}>Pickup: </Text>
                        <Text style={styles.info}>{this.state.ride.pickup}</Text>
                    </View>
                    <View flexDirection='row' style={{
                        justifyContent: 'space-between'
                    }}>
                        <Text style={styles.title}>Dropoff: </Text>
                        <Text style={styles.info}>{this.state.ride.dropoff}</Text>
                    </View>
                    <TouchableOpacity style={styles.button} title="Driver ->" onPress={() => navigate('DriverQueue', {})}>
                        <Text style={styles.buttonTxt}>Driver</Text>

                    </TouchableOpacity>

                </View>
            </ImageBackground >
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
        justifyContent: 'center',
        alignItems: 'stretch',
        flexDirection: 'column',
        paddingTop: 30,
        padding: 20,
    },
    logo: {
        flex: 1,
        width: '60%',
        height: '60%',
        resizeMode: 'contain',
        alignSelf: 'center',
        tintColor: 'white',
    },
    button: {
        backgroundColor: 'white',
        margin: 20,
        padding: 10,
        width: '60%',
        alignSelf: 'center',
        marginBottom: 10,
        marginTop: 50,
        marginRight: 5,
        borderRadius: 50
    },
    info: {
        color: 'white',
        padding: 10,
        alignSelf: 'flex-end',
        fontSize: 15,
        fontWeight: '900'
    },
    title: {
        color: 'white',
        padding: 10,
        textAlign: 'left',
        fontSize: 20,
        fontWeight: '300'
    },
    status: {
        color: 'white',
        padding: 10,
        textAlign: 'center',
        marginTop: 10,
        marginBottom: 30,
        fontSize: 30,
        fontWeight: '300'
    },
    buttonTxt: {
        alignSelf: 'center',
        color: '#E87636',
        fontSize: 16,
        fontWeight: '600',
        paddingTop: 5,
        paddingBottom: 5,
    },

    registerButton: {
        backgroundColor: 'white',
        margin: 20,
        padding: 10,
        width: '60%',
        alignSelf: 'center',
        marginBottom: 10,
        marginRight: 5,
        borderRadius: 50
    },
    registerText: {
        alignSelf: 'center',
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
        paddingTop: 5,
        paddingBottom: 5,
    }


});
