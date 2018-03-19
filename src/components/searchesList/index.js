import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { SearchHistory, SearchHistoryItem } from './styles';

class SearchesList extends Component {
  static propTypes = {
    searchTerms: PropTypes.arrayOf(PropTypes.string).isRequired,
    searchTerm: PropTypes.string.isRequired,
    onSubmit: PropTypes.func.isRequired
  };

  searchRef = React.createRef();

  render() {
    return (
      <SearchHistory>
        {this.props.searchTerms.map((searchTerm, index) => (
          <SearchHistoryItem
            key={index}
            currentSearchTerm={searchTerm === this.props.searchTerm}
            onClick={event => {
              this.props.onSubmit(searchTerm);
            }}
          >
            {searchTerm}
          </SearchHistoryItem>
        ))}
      </SearchHistory>
    );
  }
}

export default SearchesList;
