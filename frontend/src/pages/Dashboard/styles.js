import styled from 'styled-components';

export const Container = styled.div`
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translateX(-50%) translateY(-50%);
    width: 400px;
    height: 600px;
    background: white;
    box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    padding: 30px 20px;

    & h1 {
        font-size: 24px;
        color: var(--gray1);
    }
`;

export const RoomList = styled.div`
    margin-top: 20px;
    height: 480px;
    overflow-y: auto;
    width: 100%;
`;

export const RoomItem = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    font-weight: 400;
    font-size: 14px;
    color: var(--gray1);

    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    padding-bottom: 15px;

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

        &:hover {
            background: #a900c3;
        }
    }
`;

export const CreateRoomAnchor = styled.a`
    color: var(--gray1);
    font-size: 18px;
    text-decoration: none;
    transition: all .2s ease;
    cursor: pointer;
    display: flex;
    align-items: center;
    
    & svg {
        margin-left: 10px;
    }

    &:hover {
        color: var(--gray2);
    }
`;
