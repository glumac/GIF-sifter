import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ImagesGrid, GridItem, Video } from './styles';

class Images extends Component {
  static propTypes = {
    images: PropTypes.arrayOf(PropTypes.object).isRequired
  };

  render() {
    return (
      <ImagesGrid>
        {this.props.images.map((image, index) => (
          <GridItem key={index}>
            <Video
              src={image.images.looping.mp4}
              type="video/mp4"
              autoPlay
              loop
            />
          </GridItem>
        ))}
      </ImagesGrid>
    );
  }
}

export default Images;
