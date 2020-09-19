import RoomManager from './manager';
import server from '../';

class RoomController {
    rooms = new RoomManager();

    attachEvents(client) {
        client.on('create-room', data => {
            this.create(data)
                .then(roomKey => {
                    client.emit('room-creation-successful', roomKey);
                    this.join(roomKey, client);
                    this.rooms.get(roomKey, room =>
                        server.emit('new-room', room.toObject())
                    );
                })
                .catch(err => {
                    client.emit('room-creation-error', err);
                });
        });

        client.on('join-room', key => {
            this.join(key, client)
                .then(() => {
                    client.emit('room-join-successful', key);
                    this.rooms.get(key, room => {
                        client.broadcast.emit('room-player-count-update', {
                            key,
                            count: room.players.count(),
                        });
                    });
                })
                .catch(err => {
                    client.emit('room-join-error', err);
                });
        });

        client.on('get-room-list', () => {
            client.emit('room-list', this.rooms.listObjects());
        });

        client.on('disconnect', () => {
            this.rooms.get(client.room, room => {
                room.players.remove(client.id);
                server.emit('room-player-count-update', {
                    key: client.room,
                    count: room.players.count(),
                });
            });
        });
    }

    create(data) {
        return new Promise((resolve, reject) => {
            if (!data.hasOwnProperty('name')) {
                reject('Nome inválido');
            }

            if (data['name'].trim() === '') {
                reject('Digite o nome da sala');
            }

            const roomKey = this.rooms.create(data);

            resolve(roomKey);
        });
    }

    join(key, client) {
        return new Promise((resolve, reject) => {
            if (!this.rooms.exists(key)) reject('A sala não existe');

            this.rooms.get(key, room => {
                if (room.players.count() == 2) {
                    reject('A sala está cheia');
                } else {
                    room.players.add(client);
                    client.room = key;
                    client.join(key);
                }
            });

            resolve();
        });
    }
}

export default new RoomController();
