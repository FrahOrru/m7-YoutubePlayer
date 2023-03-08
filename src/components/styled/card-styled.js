import styled from "styled-components";

export const CardStyled = styled.div`
  width: 13rem;
  height: 20rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #fff;
  cursor: pointer;
  .icon {
    border-radius: 50%;
    width: 50px;
    height: 50px;
    position: relative;
  }
  .icon img {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;
