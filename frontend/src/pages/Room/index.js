import React, { useState, useEffect } from 'react';
import { Container, GameGrid, GameSection } from './styles';
import server from '../../services/server';

export default function Room() {
    const [grid, setGrid] = useState([
        ['', '', ''],
        ['', '', ''],
        ['', '', ''],
    ]);

    function handleClick(i, j, value) {
        const gridCopy = grid.slice(0);
        gridCopy[i][j] = value;
        setGrid(gridCopy);
    }

    function setupServer() {
        server.on('grid-sector-update', ({ i, j, value }) => {
            console.log(i, j, value);
        });
    }

    useEffect(setupServer, []);

    return (
        <Container>
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
        </Container>
    );
}
