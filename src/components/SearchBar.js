import React, { Component } from "react";
import PropTypes from "prop-types";

export default class SearchBar extends Component {
  searchRef = React.createRef();

  componentDidMount() {
    this.searchRef.current.focus();
  }

  searchGifs = (event) => {
    event.preventDefault();
    
    const searchTerm = this.searchRef.current.value;

    this.props.onSubmit(searchTerm);
    this.searchRef.current.focus();
    this.searchRef.current.value = '';
  }

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

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired
};
