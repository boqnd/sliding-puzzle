import App from './app.js';
import { convictConfig } from '../config.js';
import { Server } from 'socket.io';

const app = new App();
let clientNo = 0;
let roomNo;

async function start() {
  await app.init();
  const port = convictConfig.get('server.port');

  const options = {
    cors: true,
    origin: [`http://localhost:${port}`]
  };

  const server = app.express.listen(port, (err) => {
    if (err) {
      return console.log(err);
    }

    return console.log(`Server is listening on port ${port}`);
  });

  const io = new Server(server, options);
  const playersReadyMap = new Map();

  io.on('connection', socket => {
    clientNo++;
    roomNo = Math.round(clientNo / 2);
    playersReadyMap.set(roomNo, 0);
    socket.join(roomNo);
    socket.emit('serverMsg', {clientNo: clientNo, roomNo: roomNo, socketId: socket.id});
    socket.emit('serverToClient', 'Hello, client!');
    socket.on('chatMessage', message => {
      io.to(roomNo).emit('receiveChatMessage', {
        userId: socket.id,
        message: message
      });
    });

    socket.on('gameMessage', message => {
      if (message.playOn === true) {
        playersReadyMap.set(roomNo, playersReadyMap.get(roomNo) + 1);
      } else if (message.playOn === false) {
        playersReadyMap.set(roomNo, playersReadyMap.get(roomNo) - 1);
      }
      io.to(roomNo).emit('receiveGameMessage', {
        userId: socket.id,
        playersReady: playersReadyMap.get(roomNo),
        message: message
      });
    });
  });
}

async function shutdown() {
  console.log('Shutting down...');
  await app.exit();
  process.exit();
}

process.on('unhandledRejection', (reason) => {
  console.error(reason.toString());
});

process.on('SIGINT', shutdown);
process.on('SIGQUIT', shutdown);
process.on('SIGTERM', shutdown);

start();
