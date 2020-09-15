import React from 'react';
import { Container, Input } from './styles';

export default function CreateRoom() {
    return (
        <Container>
            <h1>Criar Sala</h1>
            <form>
                <Input type='text' placeholder='Digite o nome da sala...' />
            </form>
            <button>Criar</button>
        </Container>
    );
}
