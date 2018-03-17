import React from 'react';
import PropTypes from 'prop-types';

class SearchesList extends React.Component {
  static propTypes = {
    searches: PropTypes.array.isRequired,
    searchTerm: PropTypes.string.isRequired,
    searchGifs: PropTypes.func.isRequired
  };

  render() {
    return (
      <ul className="search-history-ul">
        {this.props.searches.map((searchTerm, index) => (
          <li 
            key={index}
            className={`search-history-li ${searchTerm === this.props.searchTerm ? "search-history-li--current" : ""}`}
            onClick={(event) => {this.props.searchGifs(searchTerm, event, false)}}
          >
            {searchTerm}
          </li>
        ))}
      </ul>
    );
  }
}

export default SearchesList
