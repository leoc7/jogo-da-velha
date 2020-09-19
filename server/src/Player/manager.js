import Player from './';

export default class PlayerManager {
    players = {};

    add(client) {
        this.players[client.id] = new Player(client);
        console.log(this.keys());
    }

    get(clientId) {
        return this.players[clientId];
    }

    remove(clientId) {
        delete this.players[clientId];
    }

    count() {
        return Object.keys(this.players).length;
    }

    keys() {
        return Object.keys(this.players);
    }
}
