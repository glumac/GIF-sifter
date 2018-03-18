import { combineReducers } from 'redux';
import {
  ENTER_SEARCH_TERM,
  REQUEST_IMAGES,
  RECEIVE_IMAGES
} from './actions';

function searchTerm(state = '', action) {
  switch (action.type) {
    case ENTER_SEARCH_TERM:
      return action.searchTerm;
    default:
      return state;
  }
}

function searchTerms(state = [], action) {
  switch (action.type) {
    case ENTER_SEARCH_TERM:
      const searches = [...state];

      if (!action.searchTerm) return searches;

      const existingIndexCurrentSearchTerm = searches.indexOf(action.searchTerm);

      if (existingIndexCurrentSearchTerm > -1) searches.splice(existingIndexCurrentSearchTerm, 1);

      searches.push(action.searchTerm);

      if (searches.length > 12) searches.shift();

      return searches;
    default:
      return state;
  }
}

function images(
  state = {
    isFetching: false,
    didInvalidate: false,
    items: []
  },
  action
) {
  switch (action.type) {
    case REQUEST_IMAGES:
      return {...state, isFetching: true, didInvalidate: false };
    case RECEIVE_IMAGES:
      return {...state, isFetching: false, didInvalidate: false, items: action.images };
    default:
      return state;
  }
}

function imagesBySearchTerm(state = {}, action) {
  switch (action.type) {
    case RECEIVE_IMAGES:
    case REQUEST_IMAGES:
      return {...state, [action.searchTerm]: images(state[action.searchTerm], action)};
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  imagesBySearchTerm,
  searchTerms,
  searchTerm
});

export default rootReducer;
