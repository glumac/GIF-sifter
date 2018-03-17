import React, { Component } from 'react';
import { Route} from "react-router-dom";
import PropTypes from "prop-types";
import SearchBar from './SearchBar';
import SearchesList from './SearchesList'
import GifGrid from './GifGrid';
import Trending from './Trending';
import SearchResults from "./SearchResults";
import axios from 'axios';
// import logo from './logo.svg';
import "../App.css";

class App extends Component {
  state = {
    searches: [],
    images: []
  };

  static propTypes = {
    match: PropTypes.object
  };

  componentDidMount() {
    const searchTerm = this.props.match.params.searchterm;

    if (searchTerm) return this.searchGifs(searchTerm, null, true);
    
    this.getTrendingImages();
  }

  // componentDidUpdate() {
  //   console.log('updating');
  // }

  getTrendingImages = () => {
    // console.log('GETTING TRENDING!!!')
    const updateImages = images => this.populateImageData(images);

    axios
      .get(
        `https://api.giphy.com/v1/gifs/trending?&api_key=dc6zaTOxFJmzC&limit=4`
      )
      .then(function(response) {
        console.log(response);
        
        updateImages(response.data.data);
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  searchGifs = (searchTerm, event, updateSearchesOrder) => {
    if (event) event.preventDefault();

    if (!searchTerm) {
      this.getTrendingImages();

      return this.props.history.push(`/trending`);
    }

    this.props.history.push(`/search/${searchTerm}`);

    this.updateSearches(searchTerm, updateSearchesOrder);

    const searchGifsSuccess = (images, searchTerm) => this.populateImageData(images);

    axios
      .get(
        `https://api.giphy.com/v1/gifs/search?q=${searchTerm}&api_key=dc6zaTOxFJmzC&limit=4`
      )
      .then(function(response) {
        searchGifsSuccess(response.data.data, searchTerm);
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  populateImageData = images => {
    this.setState({ images });
  };

  updateSearches = (searchTerm, updateSearchesOrder) => {
    if (!searchTerm) return;

    const searches = [...this.state.searches];
    const existingIndexCurrentSearchTerm = searches.indexOf(searchTerm);

    if (updateSearchesOrder) {
      if (existingIndexCurrentSearchTerm > -1) searches.splice(existingIndexCurrentSearchTerm, 1);
      
      searches.push(searchTerm);
      
      if (searches.length > 12) searches.shift();
    }

    this.setState({ searches });
  };

  render() {
    const imageGrid = this.state.images && (
      <GifGrid images={this.state.images} />
    );
    const searchTerm = this.props.match.params.searchterm;

    return (
      <div className="app">
        <header className="app-header">
          {/*<img src={logo} className="app-logo" alt="logo" />*/}
          <h1 className="app-title">GIF Sifter</h1>
        </header>
        <main>
          <SearchBar searchGifs={this.searchGifs} />
          <SearchesList
            searches={this.state.searches}
            searchTerm={searchTerm ? searchTerm : ''}
            searchGifs={this.searchGifs}
          />
          <Route path="/trending" component={Trending}/>
          <Route path="/search/:searchterm" component={SearchResults} />
          {imageGrid}
        </main>
      </div>
    );
  }
}

export default App;