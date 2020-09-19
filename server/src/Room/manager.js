import { v4 as generateUUID } from 'uuid';
import Room from '.';

export default class RoomManager {
    rooms = {
        UCZYW: new Room({
            name: 'Vem ver minha sala',
        }),
    };

    create(data) {
        const roomKey = generateUUID();
        this.rooms[roomKey] = new Room({ ...data, key: roomKey });

        return roomKey;
    }

    exists(roomKey) {
        return this.rooms.hasOwnProperty(roomKey);
    }

    get(roomKey, cb) {
        if (!this.exists(roomKey)) {
            return;
        }

        cb(this.rooms[roomKey]);
    }

    listObjects() {
        const list = [];
        Object.entries(this.rooms).forEach(([roomKey, room]) => {
            list.push({
                key: roomKey,
                name: room.name,
                isWaiting: room.isWaiting,
                count: room.players.count(),
            });
        });

        return list;
    }
}
