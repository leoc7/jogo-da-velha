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

    get(roomKey, cb) {
        if (!this.rooms.hasOwnProperty(roomKey)) {
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
                isWaiting: room.isWaiting
            })
        })

        return list;
    }
}
