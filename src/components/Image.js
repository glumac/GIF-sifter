import React from "react";
import PropTypes from "prop-types";

class Image extends React.Component {
  static propTypes = {
    imageData: PropTypes.object.isRequired
  };

  render() {
    return (
      <div className="images-grid-item">
        <video className="images-grid-item--image" src={this.props.imageData.images.looping.mp4} type="video/mp4" autoPlay loop />
      </div>
    )
  }
}

export default Image;
