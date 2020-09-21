import Room from '.';

export default class RoomManager {
    rooms = {
        UCZYW: new Room({
            name: 'Minha sala',
            key: 'UCZYW',
        }),
    };

    generateKey() {
        const CHARS = 'ABCDEFGHIJLKMNOPQRSTUVWXYZ0123456789';
        let result = '';

        for (let i = 0; i < 5; i++) {
            result += CHARS.charAt(Math.floor(Math.random() * CHARS.length));
        }

        return result;
    }

    create(data) {
        const roomKey = this.generateKey();
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
