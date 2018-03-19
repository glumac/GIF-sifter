import styled from 'styled-components';

export const SearchForm = styled.form`
  width: 90%;
  max-width: 500px;
  display: flex;
  margin: 0 auto;
  align-items: stretch;

  @media screen and (max-width: 500px) {
    max-width: 360px;
  }
`;

export const Input = styled.input`
  padding: 0.6rem;
  font-size: 1.6rem;
  flex-grow: 1;
  border: 1px solid black;
`;

export const Button = styled.button`
  transition: all 0.25s ease-out;
  display: inline-block;
  border: 1px solid #f4f2f4;
  border: none;
  color: #f4f2f4;
  padding: 8px;
  width: 120px;
  font-size: 1.2rem;
  font-weight: bold;
  margin-left: 5px;
  background: #222;
  cursor: pointer;

  &:hover {
    background: #333;
  }
`;
