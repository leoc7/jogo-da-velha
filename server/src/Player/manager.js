import Player from './';

export default class PlayerManager {
    players = {}

    add(client) {
        this.players[client.id] = new Player(client)
    }

    remove(clientId) {
        delete this.players[clientId];
    }
}