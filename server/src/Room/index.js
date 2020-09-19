import Player from '../Player';
import PlayerManager from '../Player/manager';

export default class Room {
    players = new PlayerManager();
    isWaiting = false;

    constructor({ name, key }) {
        this.name = name;
        this.key = key;
    }

    toObject() {
        return {
            key: this.key,
            name: this.name,
            isWaiting: this.isWaiting,
            count: this.players.count(),
        };
    }
}
