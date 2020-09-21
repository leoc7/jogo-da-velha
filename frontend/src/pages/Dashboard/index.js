import React, { useState, useEffect } from 'react';
import { Container, RoomList, RoomItem, CreateRoomAnchor } from './styles';
import { MdAdd } from 'react-icons/md';
import server from '../../services/server';

export default function Dashboard({ history }) {
    const [rooms, setRooms] = useState([]);

    useEffect(() => {
        server.emit('get-room-list');

        server.on('room-list', roomList => {
            setRooms(roomList);
        });

        server.on('new-room', room => {
            setRooms(oldRooms => [...oldRooms, room]);
        });

        server.on('room-player-count-update', room => {
            console.log(room);
            setRooms(oldRooms =>
                oldRooms.map(oldRoom => {
                    if (oldRoom.key == room.key) {
                        return { ...oldRoom, ...room };
                    }

                    return oldRoom;
                })
            );
        });
    }, []);

    function joinRoom(key) {
        history.push(`/room/${key}`);
    }

    return (
        <Container>
            <h1>Salas disponíveis</h1>
            <RoomList>
                {rooms.map(room => (
                    <RoomItem key={room.key}>
                        <span>
                            [{room.count}/2] {room.name}
                        </span>
                        <button onClick={() => joinRoom(room.key)}>
                            Entrar
                        </button>
                    </RoomItem>
                ))}
            </RoomList>
            <CreateRoomAnchor href='/create'>
                Criar sala <MdAdd />
            </CreateRoomAnchor>
        </Container>
    );
}
