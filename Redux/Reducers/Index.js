import { combineReducers } from "redux";
import PageReducers from '../Reducers/Pages';

export default combineReducers({
  ...PageReducers
});