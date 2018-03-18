import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Image } from './Image';

const ImagesGrid = styled.div`
  padding: 0 0.5rem 40px;
  display: grid;
  grid-gap: 0.5rem;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
`;

export default class Images extends Component {
  render() {
    return (
      <ImagesGrid>
        {this.props.images.map((image, index) => (
          <Image key={index} index={index} imageData={image} />
        ))}
      </ImagesGrid>
    );
  }
}

Images.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object).isRequired
};