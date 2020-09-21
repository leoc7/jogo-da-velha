import Player from '../Player';
import PlayerManager from '../Player/manager';
import server from '../';

const Status = {
    WAITING: 0,
    PLAYING: 1,
    FINISHED: 2,
};

export default class Room {
    players = new PlayerManager();
    playerTurn = null;
    playerX = null;
    playerO = null;
    status = Status.WAITING;
    grid = null;

    constructor({ name, key }) {
        this.name = name;
        this.key = key;
    }

    emitTo(clientId, header, data) {
        this.players.get(clientId).client.emit(header, data);
    }

    emit(header, data) {
        server.to(this.key).emit(header, data);
    }

    broadcastTo(clientId, header, data) {
        this.players.get(clientId).client.broadcast.emit(header, data);
    }

    toObject() {
        return {
            key: this.key,
            name: this.name,
            status: this.status,
            count: this.players.count(),
        };
    }

    updateStatus(status) {
        this.status = status;
        this.emit('room-status', status);
    }

    start() {
        this.grid = [
            ['', '', ''],
            ['', '', ''],
            ['', '', ''],
        ];
        const playerKeys = this.players.keys();

        this.playerX = playerKeys[0];
        this.playerO = playerKeys[1];

        this.playerTurn = Math.random() > 0.5 ? this.playerX : this.playerO;

        this.updateStatus(Status.PLAYING);
        this.emit('room-player-turn', this.playerTurn);
    }

    checkStart() {
        if (this.players.count() == 2) {
            this.start();
            return true;
        }

        return false;
    }

    checkWin() {
        const grid = this.grid;

        for (let i = 0; i < 3; i++) {
            let rowEqual = true;
            let ref = grid[i][0];

            if (ref !== '') {
                for (let j = 1; j < 3; j++) {
                    if (grid[i][j] !== ref) rowEqual = false;
                }
            } else {
                rowEqual = false;
            }

            if (rowEqual) {
                this.finish(ref);
                return true;
            }

            let colEqual = true;
            ref = grid[0][i];

            if (ref !== '') {
                for (let j = i; j < 3; j++) {
                    if (grid[j][i] !== ref) colEqual = false;
                }
            } else {
                colEqual = false;
            }

            if (colEqual) {
                this.finish(ref);
                return true;
            }
        }

        if (grid[0][0] !== '') {
            if (grid[0][0] === grid[1][1] && grid[0][0] === grid[2][2]) {
                this.finish(grid[0][0]);
                return true;
            }
        }
        if (grid[0][2] !== '') {
            if (grid[0][2] === grid[1][1] && grid[0][2] == grid[2][0]) {
                this.finish(grid[0][2]);
                return true;
            }
        }

        let gameOver = true;

        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (grid[i][j] === '') gameOver = false;
            }
        }

        if (gameOver) {
            this.finishGameOver();
            return true;
        }

        return false;
    }

    finishGameOver() {
        this.updateStatus(Status.FINISHED);
        this.emit('room-game-over');
    }

    finish(value) {
        let playerId = this.getPlayerIdByValue(value);

        this.updateStatus(Status.FINISHED);
        this.emit('room-player-won', playerId);
    }

    restart() {
        if (this.checkStart()) this.emit('room-restart');
        else this.emit('room-restart-error');
    }

    getPlayerIdByValue(value) {
        if (value === 'X') return this.playerX;

        return this.playerO;
    }

    getPlayerValue(playerId) {
        if (this.playerX == playerId) {
            return 'X';
        }

        return 'O';
    }

    updateSector(playerId, i, j) {
        const value = this.getPlayerValue(playerId);

        if (this.playerTurn == playerId) {
            this.grid[i][j] = value;
        }

        this.emit('grid-sector-update', {
            i,
            j,
            value,
        });

        if (!this.checkWin()) {
            this.nextPlayer();
        }
    }

    nextPlayer() {
        if (this.playerX == this.playerTurn) {
            this.playerTurn = this.playerO;
        } else {
            this.playerTurn = this.playerX;
        }

        this.emit('room-player-turn', this.playerTurn);
    }
}
