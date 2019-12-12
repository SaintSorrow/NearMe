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
import { Provider } from 'react-redux';
import ReadingListScreen from './Screens/ReadingListScreen';
import configureStore from './Redux/Store/configureStore';

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

class App extends Component{
  render() {
    return (
      <Provider store={configureStore}>
        <AppContainer/>
      </Provider>
    )
  }
}

export default App;