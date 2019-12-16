export const LocationActions = {
  ADD_LOCATION: "ADD_LOCATION",
  REMOVE_LOCATION: "REMOVE_LOCATION",
  SET_GLOBAL_LOCATION: "SET_GLOBAL_LOCATION"
}

export const LocationActionCreators = {
  addLocation: locationToAdd => {
    return {
      type: LocationActions.ADD_LOCATION,
      value: locationToAdd
    };
  },

  removeLocation: locationToRemove => {
    return {
      type: LocationActions.REMOVE_LOCATION,
      value: locationToRemove
    };
  },

  setGlobalLocation: globalLocation => {
    return {
      type: LocationActions.SET_GLOBAL_LOCATION,
      value: globalLocation
    }
  }
}