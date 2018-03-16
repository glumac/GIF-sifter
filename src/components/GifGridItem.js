import React from "react";
import PropTypes from "prop-types";

class GifGridItem extends React.Component {
  static propTypes = {
    imageData: PropTypes.object.isRequired
  };
  // render() {
  //   const { image, name, price, desc, status } = this.props.details;
  //   const isAvailable = status === "available";
  //   return (
  //     <li className="menu-fish">
  //       <img src={image} alt={name} />
  //       <h3 className="fish-name">
  //         {name}
  //         <span className="price">{formatPrice(price)}</span>
  //       </h3>
  //       <p>{desc}</p>
  //       <button
  //         disabled={!isAvailable}
  //         onClick={() => this.props.addToOrder(this.props.index)}
  //       >
  //         {isAvailable ? "Add To Order" : "Sold Out!"}
  //       </button>
  //     </li>
  //   );
  // }

  render() {

    return <div className="images-grid-item">
        <video className="images-grid-item--image" src={this.props.imageData.images.looping.mp4} type="video/mp4" autoPlay loop />
      </div>;
  }
}

export default GifGridItem;
