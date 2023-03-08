import styled from "styled-components";

export const SearchBarStyled = styled.input`
  height: 2rem;
  width: 50%;
  margin-top: 1rem;
  color: #000;
  padding-left: 15px;

  ::placeholder {
    color: #000;
  }
  ::-ms-input-placeholder {
    /* Microsoft Edge */
    color: #000;
  }
`;
