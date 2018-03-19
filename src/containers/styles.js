import styled from 'styled-components';

export const AppContainer = styled.div`
  text-align: center;
  min-height: 100vh;
  display: grid;
  grid-template-rows: auto 1fr auto;
`;

export const Inner = styled.section`
  max-width: 1200px;
  padding-top: 40px;
  margin: 0 auto;
`;

export const Message = styled.section`
  font-family: 'Monoton', cursive;
  font-size: 2em;
  line-height: 1;
  color: #cdcdcd;
  margin-top: 5rem;
  font-weight: 100;
`;
