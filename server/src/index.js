import App from './app.js';
import { convictConfig } from '../config.js';

const app = new App();

async function start() {
  await app.init();
  const port = convictConfig.get('server.port');

  app.express.listen(port, (err) => {
    if (err) {
      return console.log(err);
    }

    return console.log(`Server is listening on port ${port}`);
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
