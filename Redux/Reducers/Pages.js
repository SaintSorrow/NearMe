import { PagesActions } from './../Actions/Pages';

const initialState = {
  readingList: []
}

export function reducer(state = initialState, action) {
  switch (action.type) {
    case PagesActions.ADD_PAGE_TO_LIST:
      if (state.readingList.filter(page => page.pageId === action.value.pageId).length > 0) {
        return state;
      } else {
        return {
          ...state,
          readingList: [...state.readingList, action.value]
        };
      }

    case PagesActions.REMOVE_PAGE_FROM_LIST:
      const filteredList = state.readingList.filter(page => page.pageId !== action.value.pageId);
      return {
        ...state,
        readingList: filteredList
      };

    default:
      return state;
  }
}

export default { items: reducer };