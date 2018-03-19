import fetch from 'cross-fetch';

export const REQUEST_IMAGES = 'REQUEST_IMAGES';
export const RECEIVE_IMAGES = 'RECEIVE_IMAGES';
export const ENTER_SEARCH_TERM = 'ENTER_SEARCH_TERM';

// Eventually for .env file
const GIPHY_TRENDING_URL = 'https://api.giphy.com/v1/gifs/trending';
const GIPHY_SEARCH_URL = 'https://api.giphy.com/v1/gifs/search';
const GIPHY_API_KEY = 'dc6zaTOxFJmzC';
const GIPHY_LIMIT = 12; // # of images to be returned

export function enterSearchTerm(searchTerm) {
  return {
    type: ENTER_SEARCH_TERM,
    searchTerm
  };
}

function requestImages(searchTerm) {
  return {
    type: REQUEST_IMAGES,
    searchTerm
  };
}

function receiveImages(searchTerm, json) {
  return {
    type: RECEIVE_IMAGES,
    searchTerm,
    images: json.data
  };
}

function fetchImages(searchTerm) {
  return dispatch => {
    dispatch(requestImages(searchTerm));

    // Get images by searchTerm if we have one
    if (searchTerm) {
      return fetch(
        `${GIPHY_SEARCH_URL}?q=${searchTerm}&api_key=${GIPHY_API_KEY}&limit=${GIPHY_LIMIT}`
      )
        .then(response => response.json())
        .catch(error => console.error('Error:', error))
        .then(json => dispatch(receiveImages(searchTerm, json)));
      // Otherwise show GIPHY trending images
    } else {
      return fetch(
        `${GIPHY_TRENDING_URL}?&api_key=${GIPHY_API_KEY}&limit=${GIPHY_LIMIT}`
      )
        .then(response => response.json())
        .catch(error => console.error('Error:', error))
        .then(json => dispatch(receiveImages(searchTerm, json)));
    }
  };
}

function shouldFetchImages(state, searchTerm) {
  const images = state.imagesBySearchTerm[searchTerm];

  if (!images) {
    return true;
  } else {
    return false;
  }
}

export function fetchImagesIfNeeded(searchTerm) {
  return (dispatch, getState) => {
    if (shouldFetchImages(getState(), searchTerm)) {
      return dispatch(fetchImages(searchTerm));
    }
  };
}
