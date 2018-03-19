import styled from 'styled-components';

export const ImagesGrid = styled.div`
  padding: 0 0.5rem 40px;
  display: grid;
  grid-gap: 0.5rem;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
`;

export const GridItem = styled.div`
  display: flex;
  align-items: center;
  background: #efefef;
`;

export const Video = styled.video`
  width: 100%;
  background-color: #222;
`;
