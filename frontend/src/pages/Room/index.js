import React, { useState, useEffect } from 'react';
import { Container, GameGrid, GameSection, Details } from './styles';
import { MdKeyboardBackspace, MdCached } from 'react-icons/md';
import server from '../../services/server';

const Status = {
    WAITING: 0,
    PLAYING: 1,
    FINISHED: 2,
};

export default function Room({ history, match }) {
    const [grid, setGrid] = useState([
        ['', '', ''],
        ['', '', ''],
        ['', '', ''],
    ]);
    const [status, setStatus] = useState(Status.WAITING);
    const [playerTurn, setPlayerTurn] = useState(null);
    const [isMyTurn, setMyTurn] = useState(null);
    const [myId, setMyId] = useState(null);
    const [winner, setWinner] = useState(null);
    const [gameOver, setGameOver] = useState(false);

    function handleClick(i, j) {
        if (!isMyTurn) return;

        server.emit('grid-sector-click', { i, j });
    }

    function handleRestart() {
        server.emit('restart-room');
    }

    function handleLeave() {
        server.emit('leave-room');
        history.push('/');
    }

    function updateGrid(i, j, value) {
        setGrid(oldGrid => {
            const gridCopy = oldGrid.slice(0);
            gridCopy[i][j] = value;

            return gridCopy;
        });
    }

    function resetGrid() {
        setGrid([
            ['', '', ''],
            ['', '', ''],
            ['', '', ''],
        ]);
    }

    function setupServer() {
        server.emit('join-room', match.params.id);

        server.on('my-id', id => {
            setMyId(id);
        });

        server.on('grid-sector-update', ({ i, j, value }) => {
            updateGrid(i, j, value);
        });

        server.on('room-restart', () => {
            resetGrid();
            setGameOver(false);
        });

        server.on('room-restart-error', () => {
            alert('Não foi possível reiniciar a sala!');
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

        server.on('room-player-won', playerId => {
            setWinner(playerId);
            setMyTurn(false);
        });

        server.on('room-game-over', () => {
            setGameOver(true);
        });

        server.on('room-join-successful', key => {});

        server.on('room-join-error', err => {
            alert('Não foi possível entrar na sala: ', err);
            history.push('/')
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
                                value={col}
                                onClick={() => handleClick(i, j)}
                                key={'col' + j}>
                                {col}
                            </GameSection>
                        ))}
                    </React.Fragment>
                ))}
            </GameGrid>
            <Details>
                <span>
                    {status == Status.WAITING && (
                        <strong> Aguardando jogadores... </strong>
                    )}
                    {status == Status.PLAYING && (
                        <>
                            {isMyTurn ? (
                                <strong> É a sua vez!</strong>
                            ) : (
                                <strong> É a vez do oponente!</strong>
                            )}
                        </>
                    )}
                    {status == Status.FINISHED && (
                        <>
                            <strong>
                                O jogo acabou.{' '}
                                {gameOver ? (
                                    'Deu velha!'
                                ) : (
                                    <>
                                        {winner == myId
                                            ? 'Você ganhou! '
                                            : 'Você perdeu! '}
                                    </>
                                )}
                            </strong>
                            <a onClick={handleRestart}>
                                <MdCached /> Jogar Novamente
                            </a>
                        </>
                    )}
                </span>
                <a onClick={handleLeave}>
                    <MdKeyboardBackspace /> Sair da sala
                </a>
            </Details>
        </Container>
    );
}
