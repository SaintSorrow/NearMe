import React, { Component } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  ScrollView,
  StatusBar,
  Dimensions 
} from 'react-native';
import * as Location from 'expo-location';
import WikipediaArticle from './../Components/WikipediaArticle';
import * as WikiService from './../Services/WikiService';
import * as OpenCageService from './../Services/OpenCageService';
import { connect } from 'react-redux';
import { LocationActionCreators } from '../Redux/Actions/Locations';
import { PageActionCreators } from '../Redux/Actions/Pages';

export class MainScreen extends Component {
  constructor(props, context) {
    super(props, context);
  }
  state = {
    pages: null,
    loading: true,
  };

  async componentDidMount() {
    try {
      if (this.props.globalLocation == null) {
        await this.setGlobalLocationAsync();
      }
  
      await this.setPagesAsync();
    } catch (error) {
      console.log(error);
    }
  }

  async componentDidUpdate(previousProps) {
    if (previousProps.globalLocation !== this.props.globalLocation) {
      await this.setPagesAsync();
    }
  }

  async setGlobalLocationAsync() {
    const location = await Location.getCurrentPositionAsync({});
    const address = await OpenCageService.getFormatedAddress(location.coords.latitude, location.coords.longitude);
    const globalLocation = {
      address: address,
      latitude: location.coords.latitude,
      longitude: location.coords.longitude
    };

    this.props.setGlobalLocation(globalLocation);
    this.props.updatePageDistance(globalLocation);
  }

  async setPagesAsync() {
    const location = this.props.globalLocation;
    const pages = await WikiService.getNearbyPagesAsync(location.latitude, location.longitude);

    this.setState({
      pages: pages,
      loading: false
    })
  }

  render() {
    if (this.state.loading === true) {
      return (
        <View style={styles.container}>
          <Text>
            Loading...
          </Text>
        </View>
      )
    }

    return (
      <View style={styles.container}>
        <CurrentLocation 
          address={this.props.globalLocation.address} 
          latitude={this.props.globalLocation.latitude} 
          longitude={this.props.globalLocation.longitude}
        />
        <ScrollView>
          {(this.state.pages.map(page => 
          <WikipediaArticle 
            page={page} 
            key={page.pageId} 
            canAdd={true}
          />))}
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

const { setGlobalLocation } = LocationActionCreators;
const { updatePageDistance } = PageActionCreators;

function mapDispatchToProps(dispatch) {
  return {
    setGlobalLocation: (location) => dispatch(setGlobalLocation(location)),
    updatePageDistance: (globalLocation) => dispatch(updatePageDistance(globalLocation))
  }
}

function mapStateToProps(state) {
  return {
    globalLocation: state.locations.globalLocation
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MainScreen);

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
    backgroundColor: '#694fad',
    width: Dimensions.get('window').width
  }
});