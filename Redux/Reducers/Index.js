import { combineReducers } from "redux";
import PageReducers from '../Reducers/Pages';
import LocationReducers from '../Reducers/Locations';

export default combineReducers({
  ...PageReducers,
  ...LocationReducers
});