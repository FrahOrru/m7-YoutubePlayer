import styled from 'styled-components';

export const VideoElementStyled = styled.div`
    width: 15rem;
    height: 15rem;
    cursor: pointer;
    img {
        width: 100%;
        border-radius: 10px;
    }
    
    h3, h4 {
        margin: 0;
        white-space: nowrap;
        width: 100%;
        overflow: hidden;
        color: #fff;
    }
`;

export const LittleVideoElementStyled = styled.div`
    margin: 10px 0;
    width: 19rem;
    height: 4rem;
    display: flex;
    cursor: pointer;
    gap: 10px;
    img {
        width: 8rem;
        border-radius: 10px;
    }

    h3, h4 {
        margin: 0;
        white-space: nowrap;
        overflow: hidden;
        color: #fff;
    }
`;