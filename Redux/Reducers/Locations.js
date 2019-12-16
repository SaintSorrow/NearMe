import { LocationActions } from './../Actions/Locations';


const initialState = {
  savedLocations: [],
  globalLocation: null,
}

export function locationsReducer(state = initialState, action) {
  switch (action.type) {
    case LocationActions.ADD_LOCATION:
      const foundLocations = state.savedLocations.filter(
        loc => loc.latitude === action.value.latitude 
            && loc.longitude === LocationActions.value.longitude).length;

      if (foundLocations > 0) {
        return state;
      } else {
        return {
          ...state,
          savedLocations: [...state.savedLocations, action.value]
        };
      }

      case LocationActions.REMOVE_LOCATION:
        const filteredList = state.savedLocations.filter(
          loc => loc.latitude !== action.value.latitude && loc.longitude !== action.value.longitude);

        return {
          ...state,
          savedLocations: filteredList
        };

      case LocationActions.SET_GLOBAL_LOCATION:
        return {
          ...state,
          globalLocation: action.value
        };
      
      default:
        return state;
  }
}

export default { locations: locationsReducer};
