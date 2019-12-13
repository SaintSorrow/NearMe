export const LocationActions = {
  ADD_LOCATION: "ADD_LOCATION",
  REMOVE_LOCATION: "REMOVE_LOCATION"
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
  }
}