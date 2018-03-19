import styled from 'styled-components';

export const SearchHistory = styled.ul`
  display: flex;
  align-content: center;
  flex-direction: row-reverse;
  justify-content: center;
  list-style: none;
  margin: 0;
  padding: 1.25rem 0;
  box-sizing: border-box;
  min-height: 76px;
`;

export const SearchHistoryItem = styled.li`
  font-size: 1rem;
  padding: 8px;
  border: 1px solid ${props => (props.currentSearchTerm ? '#222' : '#bbb')};
  color: ${props => (props.currentSearchTerm ? '#222' : '#bbb')};
  margin: 0 0.25rem;
  cursor: pointer;
`;
