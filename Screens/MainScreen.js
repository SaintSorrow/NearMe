import React, { Component } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  ScrollView 
} from 'react-native';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import WikipediaArticle from './../Components/WikipediaArticle';
import * as WikiService from './../Services/WikiService';

export default class MainScreen extends Component {
  state = {
    errorMessage: null,
    longitude: null,
    latitude: null,
    pages: null,
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
    this.setState({ 
      longitude: location.coords.longitude,
      latitude: location.coords.latitude,
      pages: pages,
     });
  } 

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          {this.state.pages != null && (this.state.pages.map(page => <WikipediaArticle page={page} key={page.pageId}/>))}
          {this.state.pages == null && (<Text>Loading...</Text>)}
        </ScrollView>
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