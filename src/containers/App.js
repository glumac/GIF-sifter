import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { enterSearchTerm, fetchImagesIfNeeded } from '../actions';
import SearchBar from '../components/SearchBar';
import SearchesList from '../components/SearchesList';
import Images from '../components/Images';
import Footer from '../components/Footer';

class AsyncApp extends Component {
  componentDidMount() {
    const { dispatch, searchTerm } = this.props;
    dispatch(fetchImagesIfNeeded(searchTerm));
  }

  componentDidUpdate(prevProps) {
    if (this.props.searchTerm !== prevProps.searchTerm) {
      const { dispatch, searchTerm } = this.props;
      dispatch(fetchImagesIfNeeded(searchTerm));
    }
  }

  handleSubmit = nextsearchTerm => {
    this.props.dispatch(enterSearchTerm(nextsearchTerm));
    this.props.dispatch(fetchImagesIfNeeded(nextsearchTerm));
  };

  render() {
    const { searchTerm, images, searchTerms, isFetching } = this.props;
    return (
      <div className="app">
        <header className="app-header">
          <h1 className="app-title">GIF Sifter</h1>
        </header>
        <main>
          <div className="inner">
            <SearchBar onSubmit={this.handleSubmit} />

            <SearchesList
              searchTerms={searchTerms}
              searchTerm={searchTerm ? searchTerm : ''}
              onSubmit={this.handleSubmit}
            />

            {isFetching && images.length === 0 && <h2>Loading...</h2>}
            {!isFetching &&
              images.length === 0 && <h2>Sorry, we came up empty!.</h2>}

            {images.length > 0 && (
              <div style={{ opacity: isFetching ? 0.5 : 1 }}>
                <Images images={images} />
              </div>
            )}
          </div>
        </main>
        <Footer />
      </div>
    );
  }
}

AsyncApp.propTypes = {
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

export default connect(mapStateToProps)(AsyncApp);
