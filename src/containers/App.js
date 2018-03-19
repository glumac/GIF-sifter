import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { enterSearchTerm, fetchImagesIfNeeded } from '../actions';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import { Header } from '../components/Header';
import SearchBar from '../components/SearchBar';
import SearchesList from '../components/SearchesList';
import Images from '../components/Images';
import { Footer } from '../components/Footer';

const AppContainer = styled.div`
  text-align: center;
  min-height: 100vh;
  display: grid;
  grid-template-rows: auto 1fr auto;
`;

const Inner = styled.div`
  max-width: 1200px;
  padding-top: 40px;
  margin: 0 auto;
`;

class App extends Component {
  componentDidMount() {
    const urlSearchTerm = this.props.match.params.searchterm;
    const { dispatch } = this.props;

    const searchTerm = urlSearchTerm ? urlSearchTerm : this.props.searchTerm;

    dispatch(enterSearchTerm(searchTerm));
    dispatch(fetchImagesIfNeeded(searchTerm));
  }

  componentDidUpdate(prevProps) {
    const urlSearchTerm = this.props.match.params.searchterm;

    // If updated because of user going back or foward in browser
    if (urlSearchTerm && this.props.searchTerm !== urlSearchTerm) {
      this.props.dispatch(enterSearchTerm(urlSearchTerm));
      this.props.dispatch(fetchImagesIfNeeded(urlSearchTerm));
    }

    if (this.props.searchTerm !== prevProps.searchTerm) {
      const { dispatch, searchTerm } = this.props;
      dispatch(fetchImagesIfNeeded(searchTerm));
    }
  }

  handleSubmit = nextsearchTerm => {
    if (this.props.match.params.searchterm !== nextsearchTerm)
      if (nextsearchTerm) {
        this.props.history.push(`/search/${nextsearchTerm}`);
      } else {
        this.props.history.push(`/trending`);
      }

    this.props.dispatch(enterSearchTerm(nextsearchTerm));
    this.props.dispatch(fetchImagesIfNeeded(nextsearchTerm));
  };

  render() {
    const { searchTerm, images, searchTerms, isFetching } = this.props;
    return (
      <AppContainer>
        <Header />
        <main>
          <Inner>
            <SearchBar onSubmit={this.handleSubmit} />

            <SearchesList
              searchTerms={searchTerms}
              searchTerm={searchTerm ? searchTerm : ''}
              onSubmit={this.handleSubmit}
            />

            <div className="images-grid-wrap">
              {isFetching && images.length === 0 && <h2>Loading...</h2>}

              {!isFetching &&
                images.length === 0 && <h2>Sorry, we came up empty!.</h2>}

              {images.length > 0 && (
                <div style={{ opacity: isFetching ? 0.5 : 1 }}>
                  <Images images={images} />
                </div>
              )}
            </div>
          </Inner>
        </main>
        <Footer />
      </AppContainer>
    );
  }
}

App.propTypes = {
  searchTerm: PropTypes.string.isRequired,
  images: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  const { searchTerm, imagesBySearchTerm, searchTerms } = state;
  const { isFetching, items: images } = imagesBySearchTerm[searchTerm] || {
    isFetching: true,
    items: []
  };

  return {
    searchTerm,
    images,
    searchTerms,
    isFetching
  };
}

export default withRouter(connect(mapStateToProps)(App));
