import io from 'socket.io-client';
import { app } from '../app.js'

class SocketService {
  constructor() {
    this.socket = io('http://localhost:3000');
    this.userId = -1;
    this.handleSockets();
  }

  emitMessage = (message) => {
    this.socket.emit('message', message);
  }

  handleSockets = (userId) => {

    this.socket.on('welcome', id => { 
      this.userId = id;
    });

    this.socket.on('receiveMessage', response => {
      const isOur = response.userId === this.userId;
      app.recieveMesageFromSocket(response, isOur);
    });
  }
}

export const socketService = new SocketService();
