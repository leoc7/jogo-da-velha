import React, { useRef, useEffect } from 'react';
import { Container, RoomList, RoomItem, CreateRoomAnchor } from './styles';
import { MdAdd } from 'react-icons/md';
import server from '../../services/server';

export default function Dashboard() {
    const rooms = useRef([]);

    useEffect(() => {
        server.emit('get-room-list');

        server.on('room-list', roomList => {
            console.log(roomList);
            rooms.current = roomList;
        });

        server.on('new-room', room => {
            rooms.current = [
                ...rooms.current,
                room
            ]
        });

        server.on('update-room', room => {
            console.log(room);
        });
    }, []);

    return (
        <Container>
            <h1>Salas disponíveis</h1>
            <RoomList>
                {rooms.current.map(room => (
                    <RoomItem key={room.key}>
                        <span>[1/2] {room.name}</span>
                        <button>Entrar</button>
                    </RoomItem>
                ))}
            </RoomList>
            <CreateRoomAnchor href='/create'>
                Criar sala <MdAdd />
            </CreateRoomAnchor>
        </Container>
    );
}
