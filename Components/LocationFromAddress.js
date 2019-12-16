import React, { Component } from 'react';
import {
  View,
  TextInput, 
  StyleSheet,
  Dimensions
} from 'react-native';
import { LocationActionCreators } from '../Redux/Actions/Locations';
import { connect } from 'react-redux';
import { getLocationByAddress } from '../Services/OpenCageService';
export class LocationFromAddress extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      text: ""
    };
  }

  async submitAddress(props) {
    const location = await getLocationByAddress(this.state.text);
    if (location != null) {
      this.props.addLocation(location);
    }
  }

  render () {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.textInput}
          placeholder="Enter address"
          onChangeText={(text) => this.setState({text})}
          value={this.state.text}
          onSubmitEditing={() => this.submitAddress(this.props)}
        />
      </View>
    )
  }
}

const { addLocation } = LocationActionCreators;

function mapDispatchToProps(dispatch) {
  return {
    addLocation: (location) => dispatch(addLocation(location))
  }
}

function mapStateToProps(state) {
  return {
    savedLocations: state.locations.savedLocations
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LocationFromAddress);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#694fad',
    alignItems: 'center',
    justifyContent: 'center',
    width: Dimensions.get('window').width,
    height: 50,
    borderWidth: 2,
    paddingTop: 5,
    paddingBottom: 5
  },
  textInput: {
    color: '#F0EDF6',
    fontSize: 16
  }
})