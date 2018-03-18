import React from 'react';
import PropTypes from 'prop-types';

export const Image = (props) => {
  return (
    <div className="images-grid-item">
      <video
        className="images-grid-item--image"
        src={props.imageData.images.looping.mp4}
        type="video/mp4"
        autoPlay
        loop
      />
    </div>
  );
}

Image.propTypes = {
  imageData: PropTypes.object.isRequired
};