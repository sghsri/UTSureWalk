import React, { Component } from 'react';
import { Text, TextInput, StyleSheet, Button } from 'react-native';
import Menu, {
  MenuProvider,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';

export default class SettingsMenu extends React.Component {
  constructor(props, ctx) {
    super(props, ctx);
    this.state = {
      visible: false,
      phoneNumber: 'Change phone number',
      notes: 'Edit ADA accomodation settings',
    };
  }

  render() {
    const { navigate } = this.props.navigation;

    return (
      <MenuProvider style={{ flexDirection: 'column', padding: 20 }}>
        <MenuProvider
          skipInstanceCheck
          style={{
            flexDirection: 'column',
            padding: 15,
            backgroundColor: 'white',
          }}>
          <Menu>
            <MenuTrigger text="Settings" />
            <MenuOptions>
            //another menu option when we are on driver screens to switch to rider
              <MenuOption>
                <Button
                  title="Driver >"
                  onPress={() => navigate('DriverQueue', {})}
                />
              </MenuOption>
              <MenuOption>
                <Text
                  style={{
                    flexDirection: 'column',
                    padding: 20,
                    backgroundColor: 'orange',
                  }}>
                  Contact
                </Text>
                <TextInput
                  style={{
                    flexDirection: 'column',
                    padding: 20,
                    backgroundColor: 'orange',
                  }}>
                  {text => this.setState({ text })}
                  {this.state.phoneNumber}
                </TextInput>
              </MenuOption>
              <MenuOption>
                <TextInput
                  style={{
                    flexDirection: 'column',
                    padding: 20,
                    backgroundColor: 'orange',
                  }}>
                  {text => this.setState({ text })}
                  {this.state.notes}
                </TextInput>
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
                  color="#841584"
                />
              </MenuOption>
            </MenuOptions>
          </Menu>
        </MenuProvider>
      </MenuProvider>
    );
  }
}
