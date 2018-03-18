import fetch from 'cross-fetch';

export const REQUEST_IMAGES = 'REQUEST_IMAGES';
export const RECEIVE_IMAGES = 'RECEIVE_IMAGES';
export const ENTER_SEARCH_TERM = 'ENTER_SEARCH_TERM';

// Eventually for .env file
const GIFY_TRENDING_URL = 'https://api.giphy.com/v1/gifs/trending';
const GIFY_SEARCH_URL = 'https://api.giphy.com/v8/gifs/search';
const GIFY_API_KEY = 'dc6zaTOxFJmzC';
const GIFY_LIMIT = 12; // # of images to be returned

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
    images: json.data.map(image => image)
  };
}

function fetchImages(searchTerm) {
  return dispatch => {
    dispatch(requestImages(searchTerm));

    // Get images by searchTerm if we have one
    if (searchTerm) {
      return fetch(`${GIFY_SEARCH_URL}?q=${searchTerm}&api_key=${GIFY_API_KEY}&limit=${GIFY_LIMIT}`)
        .then(response => response.json())
        .catch(error => console.error('Error:', error))
        .then(json => dispatch(receiveImages(searchTerm, json)));
    // Otherwise show GIFY trending images
    } else {
      return fetch(`${GIFY_TRENDING_URL}?&api_key=${GIFY_API_KEY}&limit=${GIFY_LIMIT}`)
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
