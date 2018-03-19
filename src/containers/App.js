import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { enterSearchTerm, fetchImagesIfNeeded } from '../actions';
import { withRouter } from 'react-router-dom';
import Header from '../components/header';
import SearchBar from '../components/searchBar';
import SearchesList from '../components/searchesList';
import Images from '../components/images';
import Footer from '../components/footer';
import { AppContainer, Inner, Message } from './styles';

class App extends Component {
  static propTypes = {
    searchTerm: PropTypes.string.isRequired,
    images: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
    enterSearchTerm: PropTypes.func.isRequired,
    fetchImagesIfNeeded: PropTypes.func.isRequired
  };

  componentDidMount() {
    const urlSearchTerm = this.urlSearchTerm();
    const searchTerm = urlSearchTerm || this.props.searchTerm;
    const { enterSearchTerm, fetchImagesIfNeeded } = this.props;
    enterSearchTerm(searchTerm);
    fetchImagesIfNeeded(searchTerm);
  }

  componentDidUpdate(prevProps) {
    const urlSearchTerm = this.props.match.params.searchterm;

    // If updated because of user going back or forward in browser
    if (
      (typeof urlSearchTerm === 'undefined' && this.props.searchTerm.length) ||
      (urlSearchTerm && this.props.searchTerm !== urlSearchTerm)
    ) {
      const { enterSearchTerm, fetchImagesIfNeeded } = this.props;
      enterSearchTerm(urlSearchTerm);
      fetchImagesIfNeeded(urlSearchTerm);
    } else if (this.props.searchTerm !== prevProps.searchTerm) {
      const { fetchImagesIfNeeded, searchTerm } = this.props;
      fetchImagesIfNeeded(searchTerm);
    }
  }

  urlSearchTerm = () => {
    const { match: { params: { searchterm } } } = this.props;
    return searchterm;
  };

  handleSubmit = nextsearchTerm => {
    if (this.urlSearchTerm() !== nextsearchTerm)
      if (nextsearchTerm) {
        this.props.history.push(`/search/${nextsearchTerm}`);
      } else {
        this.props.history.push(`/trending`);
      }

    enterSearchTerm(nextsearchTerm);
    fetchImagesIfNeeded(nextsearchTerm);
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
              {isFetching &&
                images.length === 0 && <Message>Loading...</Message>}

              {!isFetching &&
                images.length === 0 && (
                  <Message>Sorry, we came up empty!</Message>
                )}

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

function mapDispatchToProps(dispatch) {
  return {
    enterSearchTerm: searchTerm => dispatch(enterSearchTerm(searchTerm)),
    fetchImagesIfNeeded: searchTerm => dispatch(fetchImagesIfNeeded(searchTerm))
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
