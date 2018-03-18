import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const GridItem = styled.div`
  display: flex;
  align-items: center;
  background: #efefef;
  box-sizing: border-box;
`;

const Video = styled.video`
  width: 100%;
  background-color: #222;
`;

export const Image = props => {
  return (
    <GridItem>
      <Video
        onLoad={this.imgLoaded}
        src={props.imageData.images.looping.mp4}
        type="video/mp4"
        autoPlay
        loop
      />
    </GridItem>
  );
};

Image.propTypes = {
  imageData: PropTypes.object.isRequired
};
