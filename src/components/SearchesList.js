import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const SearchHistory = styled.ul`
  display: flex;
  align-content: center;
  flex-direction: row-reverse;
  justify-content: center;
  list-style: none;
  margin: 0;
  padding: 1.25rem 0;
  box-sizing: border-box;
  min-height: 76px;`;

const SearchHistoryItem = styled.li`
  font-size: 1rem;
  padding: 8px;
  border: 1px solid ${props => (props.currentSearchTerm ? '#222' : '#bbb')};
  color: ${props => (props.currentSearchTerm ? '#222' : '#bbb')};
  margin: 0 0.25rem;
  cursor: pointer;
`;

export default class SearchesList extends React.Component {
  render() {
    return <SearchHistory>
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
      </SearchHistory>;
  }
}

SearchesList.propTypes = {
  searchTerms: PropTypes.arrayOf(PropTypes.string).isRequired,
  searchTerm: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired
};