import React from 'react';
import PropTypes from 'prop-types';

class SearchBar extends React.Component {
  searchRef = React.createRef();

  static propTypes = {
    searchGifs: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.searchRef.current.focus();
  }

  searchGifs = (event) => {
    // TO DO: maybe pull this off of event, actually cleaner maybe
    const searchTerm = this.searchRef.current.value;

    this.props.searchGifs(searchTerm, event, true);

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

export default SearchBar;
