import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

export default class App extends Component {
  state = {
    errorMessage: null,
    longitude: null,
    latitude: null,
  };

  componentWillMount () {
    this.getLocationAsync();
  }

  getLocationAsync = async() => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }

    const location = await Location.getCurrentPositionAsync({});
    const longitude = location.coords.longitude;
    const latitude = location.coords.latitude;
    this.setState({ 
      longitude: longitude,
      latitude: latitude,
     });
  } 
  render() {
    let text = 'Waiting...';
    if (this.state.errorMessage) {
      text = this.state.errorMessage;
    } else if (this.state.longitude && this.state.latitude) {
      text = "Longitude: " + this.state.longitude + "\n" + "Latitude: " + this.state.latitude;
    }

    return (
      <View style={styles.container}>
        <Text style={styles.paragraph}>{text}</Text>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    textAlign: 'right',
  },
});
