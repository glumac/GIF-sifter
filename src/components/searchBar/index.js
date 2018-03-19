import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { SearchForm, Input, Button } from './styles';

class SearchBar extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired
  };

  searchRef = React.createRef();

  componentDidMount() {
    this.searchRef.current.focus();
  }

  searchGifs = event => {
    event.preventDefault();

    const searchTerm = this.searchRef.current.value;

    this.props.onSubmit(searchTerm);
    this.searchRef.current.focus();
    this.searchRef.current.value = '';
  };

  render() {
    return (
      <SearchForm onSubmit={this.searchGifs}>
        <Input
          name="search"
          innerRef={this.searchRef}
          type="text"
          placeholder="Whatcha looking for?"
          autocomplete="off"
        />
        <Button type="submit">Sift GIFs</Button>
      </SearchForm>
    );
  }
}

export default SearchBar;
