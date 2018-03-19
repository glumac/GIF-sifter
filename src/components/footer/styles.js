import styled from 'styled-components';

export const Foot = styled.footer`
  padding: 30px 0;
  background: #222;
  color: #fff;

  @media screen and (max-width: 500px) {
    display: flex;
    padding: 0 0 5px;
    justify-content: center;
  }
`;

export const BuiltInfo = styled.span`
  font-size: 13px;
`;

export const FolioLink = styled.a`
  color: rgb(190, 193, 212);
  text-decoration: none;

  &:hover {
    color: #fff;
  }
`;

export const Github = styled.svg`
  width: 25px;
  display: block;
  margin: 20px auto 0;
  fill: rgb(190, 193, 212);
  transition: all 0.25s ease-out;

  &:hover {
    color: #fff;
  }

  @media screen and (max-width: 500px) {
    width: 19px;
  }
`;
