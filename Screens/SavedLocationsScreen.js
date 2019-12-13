import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Text
} from 'react-native';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import { connect } from 'react-redux';
import { LocationActionCreators } from '../Redux/Actions/Locations';
import * as OpenCageService from './../Services/OpenCageService';
import SavedLocation from '../Components/SavedLocation';

export class SavedLocationsScreen extends Component {
  constructor(props, context) {
    super(props, context);
  }

  async addCurrentLocation(props) {
    try {
      let { status } = await Permissions.askAsync(Permissions.LOCATION);
      const location = await Location.getCurrentPositionAsync({});
      const address = await OpenCageService.getFormatedAddress(location.coords.latitude, location.coords.longitude);
      const savedLocation = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        address: address
      }
      this.props.addLocation(savedLocation);
    } catch (error) {
      console.log("Error: " + error);
    }
  }


  render () {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => this.addCurrentLocation(this.props)}>
          <Text>
            Add Current Location
          </Text>
        </TouchableOpacity>
        {this.props.savedLocations.length === 0 && 
          (<Text>No saved locations!</Text>)}
        {this.props.savedLocations.length > 0 && 
          (this.props.savedLocations.map(loc => <SavedLocation location={loc} key={loc.address}/>))}
      </View>
    );
  }
}

const { addLocation, removeLocation } = LocationActionCreators;

function mapDispatchToProps(dispatch) {
  return {
    addLocation: (location) => dispatch(addLocation(location))
  };
}

function mapStateToProps(state) {
  return {
    savedLocations: state.locations.savedLocations
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SavedLocationsScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: StatusBar.currentHeight
  }  
});