import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const SearchForm = styled.form`
  width: 90%;
  max-width: 500px;
  display: flex;
  margin: 0 auto;
  align-items: stretch;

  @media screen and (max-width: 500px) {
    max-width: 360px;
  }
`;

const Input = styled.input`
  padding: 0.6rem;
  font-size: 1.6rem;
  flex-grow: 1;
  border: 1px solid black;
`;

const Button = styled.button`
  transition: all 0.25s ease-out;
  display: inline-block;
  border: 1px solid #f4f2f4;
  border: none;
  color: #f4f2f4;
  padding: 8px;
  width: 120px;
  font-size: 1.2rem;
  font-weight: bold;
  margin-left: 5px;
  background: #222;
  cursor: pointer;

  &:hover {
    background: #333;
  }
`;

export default class SearchBar extends Component {
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

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired
};
