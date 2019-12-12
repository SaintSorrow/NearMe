import { createStore, applyMiddleware } from 'redux';
import RootReducer from '../Reducers/Index';

let middleware = [];

const baseStore = createStore(RootReducer, applyMiddleware(...middleware));

export default baseStore;