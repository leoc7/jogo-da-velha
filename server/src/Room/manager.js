import { v4 as generateUUID } from 'uuid';
import Room from '.';

export default class RoomManager {
    rooms = {
        UCZYW: new Room({
            name: 'Vem ver minha sala',
            key: 'UCZYW'
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
        Object.entries(this.rooms).forEach(([, room]) => {
            list.push(room.toObject());
        });

        return list;
    }
}
