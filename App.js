import React, { Component } from 'react';
import {  
  View
} from 'react-native';
import { 
  createMaterialBottomTabNavigator 
} from 'react-navigation-material-bottom-tabs';
import MainScreen from './Screens/MainScreen';
import Icon from 'react-native-vector-icons/Ionicons';
import { createAppContainer } from 'react-navigation';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import * as WikiService from './Services/WikiService';
import * as OpenCageService from './Services/OpenCageService';
import ReadingListScreen from './Screens/ReadingListScreen';

const TabNavigator = createMaterialBottomTabNavigator(
  {
    MainScreen: {
      screen: MainScreen,
      navigationOptions: {
        tabBarLabel: 'Home',
        tabBarIcon: ({ tintColor }) => (
          <View>
            <Icon style={{color: tintColor}} size={25} name={'md-home'}/>
          </View>
        )
      }
    },
    ReadingListScreen: {
      screen: ReadingListScreen,
      navigationOptions: {
        tabBarLabel: 'List',
        tabBarIcon: ({ tintColor }) => (
          <View>
            <Icon style={{color: tintColor}} size={25} name={'md-book'}/>
          </View>
        )
      }
    }
  },
  {
    initialRouteName: 'MainScreen',
    activeColor: '#F0EDF6',
    inactiveColor: '#3E2465',
    barStyle: { backgroundColor: '#694FAD'},
  }
)

const AppContainer = createAppContainer(TabNavigator);

const initialState = {
  longitude: null,
  latitude: null,
  pages: null,
  currentAddress: null
}

async function getLocation() {
  let { status } = await Permissions.askAsync(Permissions.LOCATION);
  if (status !== 'granted')
    return null;
  
  const location = await Location.getCurrentPositionAsync({});
  console.log("lat: " + location.coords.latitude + ", lon: " + location.coords.longitude);
  const pages = await WikiService.getNearbyPagesAsync(location.coords.latitude, location.coords.longitude);
  const address = await OpenCageService.getFormatedAddress(location.coords.latitude, location.coords.longitude);

  return {
    latitude: location.coords.latitude, 
    longitude: location.coords.longitude, 
    pages: pages, 
    address: address};
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_LOCATION':
        const result = getLocation();
        return {
          ...state,
          latitude: result.latitude,
          longitude: result.longitude,
          pages: result.pages,
          currentAddress: result.address,
          text: "Some text!"
        };
    case 'SHOW_STATE':
      console.log("SHOW STATE");
      console.log(state);
      console.log("AFTER SHOW STATE");
      return state;
    default: 
      return state;
  }
}

const store = createStore(reducer);

class App extends Component{
  render() {
    return (
      <Provider store={store}>
        <AppContainer/>
      </Provider>
    )
  }
}

export default App;