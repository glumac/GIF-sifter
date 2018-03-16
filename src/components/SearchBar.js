import React from "react";
import PropTypes from "prop-types";
import axios from "axios";

class SearchBar extends React.Component {
  searchRef = React.createRef();

  static propTypes = {
    populateImageData: PropTypes.func
  };

  componentDidMount() {
    // this.searchGifs();
  }

  searchGifs = event => {
    if (event) event.preventDefault();
    
    const searchTerm = this.searchRef.current.value;

    const updateImages = imagesData => this.props.populateImageData(imagesData);

    axios
      .get(`https://api.giphy.com/v1/gifs/search?q=${searchTerm}&api_key=dc6zaTOxFJmzC&limit=12`)
      .then(function(response) {
        // console.log(response);

        updateImages(response.data.data);
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  render() {
    return (
      <form className="search-form" onSubmit={this.searchGifs}>
        <input
          className="search-input"
          name="search"
          ref={this.searchRef}
          type="text"
          placeholder="Whatcha looking for?"
        />
        <button className="search-button" type="submit">
          Sift GIFs
        </button>
      </form>
    );
  }
}

export default SearchBar;
