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
    }
  }
)

export default createAppContainer(TabNavigator);

