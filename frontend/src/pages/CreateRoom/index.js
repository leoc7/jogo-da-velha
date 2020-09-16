import React, { useEffect, useState } from 'react';
import { Container, Input } from './styles';
import server from '../../services/server';

export default function CreateRoom({ history }) {
    const [name, setName] = useState('');

    function handleSubmit(e) {
        e.preventDefault();
        server.emit('create-room', {
            name,
        });
    }

    useEffect(() => {
        server.on('room-creation-successful', key => {
            history.push(`/room/${key}`);
        });

        server.on('room-creation-error', err => {
            console.log('Ocorreu um erro ao criar a sala:', err);
        });
    }, []);

    return (
        <Container>
            <h1>Criar Sala</h1>
            <form onSubmit={handleSubmit}>
                <Input
                    onChange={e => setName(e.target.value)}
                    type='text'
                    required
                    placeholder='Digite o nome da sala...'
                />
                <button type='submit'>Criar</button>
            </form>
        </Container>
    );
}
