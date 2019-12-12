import { createStore, applyMiddleware } from 'redux';
import RootReducer from '../Reducers/Index';

const logger = store => next => action => {
  console.log('dispatching', action)
  let result = next(action)
  console.log('next state', store.getState())
  return result
}

let middleware = [logger];

const baseStore = createStore(RootReducer, applyMiddleware(...middleware));

export default initialState => {
  return baseStore;
}