import styled from 'styled-components';

export const Container = styled.div`
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translateX(-50%) translateY(-50%);
    width: 400px;
    background: white;
    box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    padding: 30px 20px;

    & h1 {
        font-size: 24px;
        color: var(--gray1);
    }

    & form {
        display: flex;
        flex-direction: column;
        margin-top: 20px;
        margin: 10px 0;
    }

    & form label {
        font-size: 12px;
        text-transform: uppercase;
        color: var(--gray1);
        font-weight: 600;
        margin-bottom: 5px;
    }

    & button {
        background: #c617e1;
        transition: all 0.2s ease;
        padding: 10px 20px;
        border: none;
        border-radius: 8px;
        font-weight: 700;
        color: white;
        cursor: pointer;
        font-size: 14px;
        width: 100%;

        &:hover {
            background: #a900c3;
        }
    }
`;

export const Input = styled.input`
    border: 2px solid rgba(0, 0, 0, 0.1);
    border-radius: 4px;
    padding: 10px;
    color: var(--gray1);

    &::placeholder {
        font-weight: 200;
        color: #c7c7c7;
    }
`;
