import React, { useState, useEffect } from 'react';
import { Container, GameGrid, GameSection, Details } from './styles';
import { MdKeyboardBackspace } from 'react-icons/md';
import server from '../../services/server';

const Status = {
    WAITING: 0,
    PLAYING: 1,
    FINISHED: 2,
};

export default function Room({ match }) {
    const [grid, setGrid] = useState([
        ['', '', ''],
        ['', '', ''],
        ['', '', ''],
    ]);
    const [status, setStatus] = useState(Status.WAITING);
    const [playerTurn, setPlayerTurn] = useState(null);
    const [isMyTurn, setMyTurn] = useState(null);
    const [myId, setMyId] = useState(null);

    function handleClick(i, j, value) {
        if(!isMyTurn) return;

        const gridCopy = grid.slice(0);
        gridCopy[i][j] = value;
        setGrid(gridCopy);
    }

    function setupServer() {
        server.emit('join-room', match.params.id);

        server.on('my-id', id => {
            setMyId(id);
        });

        server.on('grid-sector-update', ({ i, j, value }) => {
            console.log(i, j, value);
        });

        server.on('room-status', status => {
            setStatus(status);
        });

        server.on('room-player-turn', playerId => {
            setPlayerTurn(playerId);
            setMyId(id => {
                setMyTurn(playerId == id);
                return id;
            });
        });
    }

    useEffect(setupServer, []);

    return (
        <Container>
            <h1>Sala #{match.params.id}</h1>
            <GameGrid>
                {grid.map((row, i) => (
                    <React.Fragment key={'row' + i}>
                        {row.map((col, j) => (
                            <GameSection
                                onClick={() => handleClick(i, j, 'X')}
                                key={'col' + j}>
                                {col}
                            </GameSection>
                        ))}
                    </React.Fragment>
                ))}
            </GameGrid>
            <Details>
                <span>
                    Status:
                    {status == Status.WAITING && (
                        <strong> Aguardando jogadores... </strong>
                    )}
                    {status == Status.PLAYING && (
                        <>
                            {isMyTurn ? (
                                <strong>É a sua vez!</strong>
                            ) : (
                                <strong>É a vez do oponente!</strong>
                            )}
                        </>
                    )}
                    {status == Status.FINISHED && (
                        <strong> O jogo acabou! </strong>
                    )}
                </span>
                <a>
                    <MdKeyboardBackspace /> Sair da sala
                </a>
            </Details>
        </Container>
    );
}
