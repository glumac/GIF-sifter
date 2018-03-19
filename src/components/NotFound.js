import React from 'react';
import styled from 'styled-components';

const NotFoundWrap = styled.div`
  min-height: 100vh;
  background: #222;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const NotFoundHeading = styled.h1`
  font-family: 'Monoton', cursive;
  font-size: 4em;
  font-weight: 100;
`;

export const NotFound = () => (
  <NotFoundWrap>
    <NotFoundHeading>Not &nbsp;&nbsp; Found!!</NotFoundHeading>
  </NotFoundWrap>
);
