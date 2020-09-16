import io from 'socket.io';
import RoomController from './Room/controller';

const server = io(5557);

server.on('connection', client => {
    RoomController.attachEvents(client);
})

export default server;