import RoomManager from './manager';
import server from '../';

class RoomController {
    rooms = new RoomManager();

    attachEvents(client) {
        client.on('create-room', data => {
            this.create(data)
                .then(roomKey => {
                    client.emit('room-creation-successful', roomKey);
                    this.rooms.get(roomKey, room =>
                        server.emit('new-room', room.toObject())
                    );
                })
                .catch(err => {
                    client.emit('room-creation-error', err);
                });
        });

        client.on('get-room-list', () => {
            client.emit('room-list', this.rooms.listObjects());
        });

        client.on('disconnect', () => {
            this.rooms.get(client.room, room => {
                room.players.remove(client.id);
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
}

export default new RoomController();
