import styled from "styled-components";

export const ModalStyled = styled.div`
  position: absolute;
  z-index: 100;
  width: 300px;
  height: 400px;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.1);

  .close {
    width: 2rem;
    height: 2rem;
    cursor: pointer;
    color: white;
  }
`;

export const ModalBigStyled = styled.div`
  position: absolute;
  z-index: 100;
  width: 800px;
  height: 500px;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.1);

  .close {
    width: 2rem;
    height: 2rem;
    cursor: pointer;
    color: white;
  }
`;
