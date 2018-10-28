import React from 'react';
import {StyleSheet, View, Text, Button} from 'react-native';



export default class RiderScreen extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = { };
  }
  
  render() {
    return (
      <View style = {{paddingTop:20}}>
        <Text>Rider Home!</Text>
        <Button 
          onPress={() => fetch('https://react-test-79a3b.firebaseio.com/queue.json', {
                    method: 'POST',
                    body: JSON.stringify({
                      firstItem: 'first data point', 
                      secondItem: 'second data point'
                    })
                  })}
          title="POST to firebase"
          color="#841584"
        />
      </View>
    );
  }
}

const style = StyleSheet.create({

});