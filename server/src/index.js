import App from './app.js';
import { convictConfig } from '../config.js';
import { Server } from 'socket.io';

const app = new App();

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

  io.on('connection', socket => {
    socket.emit('welcome', socket.id);
    socket.join('room1');
    socket.on('message', message => {
      io.to('room1').emit('receiveMessage', {
        userId: socket.id,
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
