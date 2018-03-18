import React from 'react';
import PropTypes from 'prop-types';

export default class SearchesList extends React.Component {
  render() {
    return (
      <ul className="search-history-ul">
        {this.props.searchTerms.map((searchTerm, index) => (
          <li
            key={index}
            className={`search-history-li ${
              searchTerm === this.props.searchTerm
                ? 'search-history-li--current'
                : ''
            }`}
            onClick={event => {
              this.props.onSubmit(searchTerm);
            }}
          >
            {searchTerm}
          </li>
        ))}
      </ul>
    );
  }
}

SearchesList.propTypes = {
  searchTerms: PropTypes.arrayOf(PropTypes.string).isRequired,
  searchTerm: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired
};
