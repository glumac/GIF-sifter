import React, { Component } from 'react';
// import PropTypes from "prop-types";
import SearchBar from "./components/SearchBar";
import GifGrid from "./components/GifGrid";
import axios from "axios";
// import logo from './logo.svg';
import './App.css';

class App extends Component {
  state = {
    searchInput: '',
    searchHistory: [],
    imagesData: []
  };

  // static propTypes = {
  //   match: PropTypes.object
  // };

  componentDidMount() {
    if (this.state.searchInput) return;

    this.getTrendingImages();
  };

  getTrendingImages = () => {
    console.log('GETTING TRENDING!!!')

    const updateImages = imagesData => this.populateImageData(imagesData);

    axios
      .get(`https://api.giphy.com/v1/gifs/trending?&api_key=dc6zaTOxFJmzC&limit=12`)
      .then(function(response) {
        console.log(response.data.data);

        updateImages(response.data.data);
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  populateImageData = imagesData => {
    this.setState({ imagesData });
  };

  render() {
    const imageGrid = this.state.imagesData && <GifGrid imagesData={this.state.imagesData} />;

    return(
      <div className="app">
        <header className="app-header">
          {/*<img src={logo} className="app-logo" alt="logo" />*/}
          <h1 className="app-title">GIF Sifter</h1>
        </header>
        <SearchBar populateImageData={this.populateImageData} />
       {imageGrid}
      </div>
    );
  }
}

export default App;
