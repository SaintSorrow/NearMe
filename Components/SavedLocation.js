import React, { Component } from 'react';
import {
  View,
  Text, 
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default class SavedLocation extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      location: props.location
    }
  }

  render() {
    return (
      <View>
        <TouchableOpacity>
          <Text>{location.address}</Text>
        </TouchableOpacity>
        <Icon size={25} name={'md-trash'}/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
})