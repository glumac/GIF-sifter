import React from 'react';
import PropTypes from 'prop-types';
import GifGridItem from './GifGridItem';

class GifGrid extends React.Component {
  static propTypes = {
    images: PropTypes.array.isRequired
  };

  render() {
    return (
      <div className="images-grid">
        {this.props.images.map((image, index) => (
          <GifGridItem key={index} index={index} imageData={image} />
        ))}
      </div>
    );

  }
}

export default GifGrid;
