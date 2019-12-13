import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  StatusBar
} from 'react-native';

export default class SavedLocationsScreen extends Component {
  constructor(props, context) {
    super(props, context);
  }

  render () {
    return (
      <View style={styles.container}>

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
    paddingTop: StatusBar.currentHeight
  }  
});