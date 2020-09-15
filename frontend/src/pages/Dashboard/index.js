import React from 'react';
import { Container, RoomList, RoomItem, CreateRoomAnchor } from './styles';
import { MdAdd } from 'react-icons/md';

export default function Dashboard() {
    return (
        <Container>
            <h1>Salas disponíveis</h1>
            <RoomList>
                <RoomItem>
                    <span>[1/2] Vem ver minha sala</span>
                    <button>Entrar</button>
                </RoomItem>
            </RoomList>
            <CreateRoomAnchor href='/create'>
                Criar sala <MdAdd />
            </CreateRoomAnchor>
        </Container>
    );
}
