import fetch from 'cross-fetch';

export const REQUEST_IMAGES = 'REQUEST_IMAGES';
export const RECEIVE_IMAGES = 'RECEIVE_IMAGES';
export const ENTER_SEARCH_TERM = 'ENTER_SEARCH_TERM';

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
      return fetch(`https://api.giphy.com/v1/gifs/search?q=${searchTerm}&api_key=dc6zaTOxFJmzC&limit=12`)
        .then(response => response.json())
        .then(json => dispatch(receiveImages(searchTerm, json)));
    // Otherwise show GIFY trending images
    } else {
      return fetch(`https://api.giphy.com/v1/gifs/trending?&api_key=dc6zaTOxFJmzC&limit=12`)
        .then(response => response.json())
        .then(json => dispatch(receiveImages(searchTerm, json)));
    }
  };
}

function shouldFetchImages(state, searchTerm) {
  const images = state.imagesBySearchTerm[searchTerm];
  if (!images) {
    return true;
  } else if (images.isFetching) {
    return false;
  } else {
    return images.didInvalidate;
  }
}

export function fetchImagesIfNeeded(searchTerm) {
  return (dispatch, getState) => {
    if (shouldFetchImages(getState(), searchTerm)) {
      return dispatch(fetchImages(searchTerm));
    }
  };
}