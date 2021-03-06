import React, { Component } from 'react';
import {
  View,
  Text, 
  StyleSheet,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { LocationActionCreators } from '../Redux/Actions/Locations';
import { PageActionCreators} from '../Redux/Actions/Pages';
import { connect } from 'react-redux';

export class SavedLocation extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      location: props.location
    }
  }

  goToMainScreen() {
    this.props.setGlobalLocation(this.state.location);
    this.props.updatePageDistance(this.state.location);
    this.props.navigation.navigate('MainScreen');
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => this.goToMainScreen()}>
          <Text style={styles.text}>{this.state.location.address}</Text>
        </TouchableOpacity>
        <Icon style={styles.icon}
          size={25} 
          name={'md-trash'} 
          onPress={() => this.props.removeLocation(this.state.location)}/>
      </View>
    )
  }
}
 
const { removeLocation, setGlobalLocation } = LocationActionCreators;
const { updatePageDistance } = PageActionCreators;

function mapDispatchToProps(dispatch) {
  return {
    removeLocation: (location) => dispatch(removeLocation(location)),
    setGlobalLocation: (location) => dispatch(setGlobalLocation(location)),
    updatePageDistance: (globalLocation) => dispatch(updatePageDistance(globalLocation))
  }
}

function mapStateToProps(state) {
  return {
    savedLocations: state.locations.savedLocations,
    globalLocation: state.locations.globalLocation
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SavedLocation)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    paddingTop: 5,
    paddingBottom: 5,
    flexDirection: 'column',
    width: Dimensions.get('window').width,
    height: 100
  },
  text: {
    textAlign: 'center',
    fontSize: 16,
    width: (Dimensions.get('window').width - 80)
  },
  icon: {
    position: 'absolute',
    left: 20
  }
})