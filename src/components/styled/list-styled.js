import styled from "styled-components";

export const ListStyled = styled.ul`
  list-style-type: none;

  li {
    text-decoration: none;
    cursor: pointer;
    padding: 1rem 0;
  }

  li:hover {
    text-decoration: underline;
  }
`;
