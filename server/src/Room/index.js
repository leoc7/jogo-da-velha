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
        console.log('status atualziado na sala', this.key);
    }

    checkStart() {
        if (this.players.count() == 2) {
            this.start();
        }
    }

    start() {
        console.log('começou');
        const playerKeys = this.players.keys();

        this.playerX = playerKeys[0];
        this.playerO = playerKeys[1];

        this.playerTurn = Math.random() > 0.5 ? this.playerX : this.playerO;

        this.updateStatus(Status.PLAYING);
        this.emit('room-player-turn', this.playerTurn);
    }

    tick() {}
}
