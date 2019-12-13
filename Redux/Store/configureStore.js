import { createStore, applyMiddleware } from 'redux';
import RootReducer from '../Reducers/Index';
import { persistStore, persistReducer } from 'redux-persist';
import { AsyncStorage } from 'react-native';

const logger = store => next => action => {
  console.log('dispatching', action)
  let result = next(action)
  console.log('next state', store.getState())
  return result
}

const persistConfig = {
  key: 'root',
  storage: AsyncStorage
}

let middleware = [logger];

const persistedReducer = persistReducer(persistConfig, RootReducer);

export const store = createStore(persistedReducer, undefined, applyMiddleware(...middleware));

export const persistor = persistStore(store);