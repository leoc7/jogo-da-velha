import styled, { css } from 'styled-components';

export const Container = styled.div`
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translateX(-50%) translateY(-50%);
    width: 600px;
    background: white;
    box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    padding: 30px 20px;

    & h1 {
        font-size: 24px;
        color: var(--gray1);
    }
`;

export const GameGrid = styled.div`
    display: grid;
    grid-template-rows: repeat(3, 1fr);
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 20px;
    width: 560px;
    height: 530px;
    margin-top: 20px;
`;

export const GameSection = styled.div`
    border: 2px solid rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 108px;
    cursor: pointer;

    ${p =>
        p.value == 'O'
            ? css`
                  color: blue;
              `
            : css`
                  color: red;
              `}
`;

export const Details = styled.div`
    margin-top: 20px;
    display: flex;
    justify-content: space-between;

    & a {
        display: flex;
        align-items: center;
        transition: all .2s ease;
        cursor: pointer;
        
        & svg{
            margin-right: 6px;
        }
    }

    & a:hover {
        color: var(--gray2);
    }
`;
