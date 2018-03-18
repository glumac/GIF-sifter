import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Image } from './Image';

export default class Images extends Component {
  render() {
    return (
      <div className="images-grid">
        {this.props.images.map((image, index) => (
          <Image key={index} index={index} imageData={image} />
        ))}
      </div>
    );
  }
}

Images.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object).isRequired
};