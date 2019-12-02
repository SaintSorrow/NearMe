import React, { Component } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  ScrollView,
  StatusBar 
} from 'react-native';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import WikipediaArticle from './../Components/WikipediaArticle';
import * as WikiService from './../Services/WikiService';
import * as OpenCageService from './../Services/OpenCageService';

export default class MainScreen extends Component {
  state = {
    errorMessage: null,
    longitude: null,
    latitude: null,
    pages: null,
    address: null
  };

  componentWillMount () {
    this.getLocationAsync();
  }

  async getLocationAsync() {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }

    const location = await Location.getCurrentPositionAsync({});
    const pages = await WikiService.getNearbyPagesAsync(location.coords.latitude, location.coords.longitude);
    const address = await OpenCageService.getFormatedAddress(location.coords.latitude, location.coords.longitude);
    this.setState({ 
      longitude: location.coords.longitude,
      latitude: location.coords.latitude,
      pages: pages,
      address: address
     });
  } 

  render() {
    return (
      <View style={styles.container}>
        <CurrentLocation address={this.state.address} latitude={this.state.latitude} longitude={this.state.longitude}/>
        <ScrollView>
          {this.state.pages != null && (this.state.pages.map(page => <WikipediaArticle page={page} key={page.pageId}/>))}
          {this.state.pages == null && (<Text>Loading...</Text>)}
        </ScrollView>
      </View>
    );
  }
}

const CurrentLocation = props => 
  (
    <View style={styles.address}>
      <Text style={styles.addressText}>Latitude: {props.latitude}, Longitude: {props.longitude}</Text>
      <Text style={styles.addressText}>Address: {props.address}</Text>
    </View>
  )

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: StatusBar.currentHeight
  },
  addressText: {
    color: '#F0EDF6'
  },
  address: {
    paddingLeft: 10,
    paddingRight: 10,
    borderWidth: 5,
    borderColor: '#694fad',
    backgroundColor: '#694fad'
  }
});