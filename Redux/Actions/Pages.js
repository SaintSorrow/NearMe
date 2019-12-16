export const PagesActions = {
  ADD_PAGE_TO_LIST: "ADD_PAGE_TO_LIST",
  REMOVE_PAGE_FROM_LIST: "REMOVE_PAGE_FROM_LIST",
  UPDATE_PAGE_DISTANCE: "UPDATE_PAGE_DISTANCE"
}

export const PageActionCreators = {
  addPage: pageToAdd => {
    return {
      type: PagesActions.ADD_PAGE_TO_LIST,
      value: pageToAdd
    }
  },

  removePage: pageToRemove => {
    return {
      type: PagesActions.REMOVE_PAGE_FROM_LIST,
      value: pageToRemove
    }
  },

  updatePageDistance: globalLocation => {
    return {
      type: PagesActions.UPDATE_PAGE_DISTANCE,
      value: globalLocation
    }
  }
}