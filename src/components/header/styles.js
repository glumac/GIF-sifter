import styled from 'styled-components';

export const AppHeader = styled.header`
  background: linear-gradient(20deg, rgb(219, 112, 147), #daa357);
  padding: 20px;
  color: #fff;
`;

export const HeaderTitle = styled.h1`
  font-family: 'Monoton', cursive;
  font-size: 4em;
  line-height: 1;
  margin: 0;
  font-weight: 100;

  @media screen and (max-width: 500px) {
    font-size: 3em;
  }
`;
