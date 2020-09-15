import React from 'react';
import { Container, GameGrid, GameSection } from './styles';

export default function Dashboard() {
    return (
        <Container>
        <GameGrid>
            <GameSection />
            <GameSection />
            <GameSection />

            <GameSection />
            <GameSection />
            <GameSection />

            <GameSection />
            <GameSection />
            <GameSection />
        </GameGrid>

        </Container>
    );
}
