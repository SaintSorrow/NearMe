import React, { Component } from 'react';
import {  
  View,
  ActivityIndicator,
  StyleSheet
} from 'react-native';
import { 
  createMaterialBottomTabNavigator 
} from 'react-navigation-material-bottom-tabs';
import MainScreen from './Screens/MainScreen';
import Icon from 'react-native-vector-icons/Ionicons';
import { createAppContainer } from 'react-navigation';
import { Provider } from 'react-redux';
import ReadingListScreen from './Screens/ReadingListScreen';
import { store, persistor} from './Redux/Store/configureStore';
import SavedLocationsScreen from './Screens/SavedLocationsScreen';
import { PersistGate } from 'redux-persist/integration/react';

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
    },
    SavedLocationsScreen: {
      screen: SavedLocationsScreen,
      navigationOptions: {
        tabBarLabel: 'Locations',
        tabBarIcon: ({ tintColor }) => (
          <View>
            <Icon style={{ color: tintColor }} size={25} name={'md-locate'}/>
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
  renderLoading = () => (
    <View style={styles.container}>
      <ActivityIndicator size="large"/>
    </View>
  );

  render() {
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor} loading={this.renderLoading()}> 
          <AppContainer/>
        </PersistGate>
      </Provider>
    )
  }
}

export default App;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});