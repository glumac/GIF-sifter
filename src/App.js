import React, { Component } from 'react';
// import PropTypes from "prop-types";
import SearchBar from './components/SearchBar';
import SearchesList from './components/SearchesList'
import GifGrid from './components/GifGrid';
import axios from 'axios';
// import logo from './logo.svg';
import './App.css';

class App extends Component {
  state = {
    searchTerm: '',
    searchHistory: [],
    imagesData: []
  };

  // static propTypes = {
  //   match: PropTypes.object
  // };

  componentDidMount() {
    if (this.state.searchTerm) return;

    this.getTrendingImages();
  }

  getTrendingImages = () => {
    // console.log('GETTING TRENDING!!!')
    const updateImages = imagesData => this.populateImageData(imagesData);

    axios
      .get(
        `https://api.giphy.com/v1/gifs/trending?&api_key=dc6zaTOxFJmzC&limit=12`
      )
      .then(function(response) {
        updateImages(response.data.data);
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  searchGifs = (searchTerm, event, updateHistoryOrder) => {
    if (event) event.preventDefault();


    if (!searchTerm) {
      this.updateSearchHistory(searchTerm, false);

      return this.getTrendingImages();
    }

    this.updateSearchHistory(searchTerm, updateHistoryOrder);

    const searchGifsSuccess = (imagesData, searchTerm) => {
      this.populateImageData(imagesData);
    };

    axios
      .get(
        `https://api.giphy.com/v1/gifs/search?q=${searchTerm}&api_key=dc6zaTOxFJmzC&limit=12`
      )
      .then(function(response) {
        searchGifsSuccess(response.data.data, searchTerm);
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  populateImageData = imagesData => {
    this.setState({ imagesData });
  };

  updateSearchHistory = (searchTerm, updateHistoryOrder) => {
    if (!searchTerm) return this.setState({ searchTerm });

    const searchHistory = [...this.state.searchHistory];
    const existingIndexCurrentSearchTerm = searchHistory.indexOf(searchTerm);

    if (updateHistoryOrder) {
      if (existingIndexCurrentSearchTerm > -1) searchHistory.splice(existingIndexCurrentSearchTerm, 1);
      
      searchHistory.push(searchTerm);
      
      if (searchHistory.length > 12) searchHistory.shift();
    }

    this.setState({ searchHistory, searchTerm });
  };

  render() {
    const imageGrid = this.state.imagesData && (
      <GifGrid imagesData={this.state.imagesData} />
    );

    return (
      <div className="app">
        <header className="app-header">
          {/*<img src={logo} className="app-logo" alt="logo" />*/}
          <h1 className="app-title">GIF Sifter</h1>
        </header>
        <main>
          <SearchBar searchGifs={this.searchGifs} />
          <SearchesList
            searchHistory={this.state.searchHistory}
            searchTerm={this.state.searchTerm}
            searchGifs={this.searchGifs}
          />
          {imageGrid}
        </main>
      </div>
    );
  }
}

export default App;
