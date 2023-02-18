import io from 'socket.io-client';

import { app } from '../app.js'

class SocketService {
  constructor() {
    this.socket = io('http://localhost:3000');
    this.userId;
    this.clientRoom;
    this.gameOn = false;
    this.handleSockets();
  }

  emitMessage = (event, data) => {
    this.socket.emit(event, data);
  }

  handleSockets = () => {
    
    this.socket.on('serverMsg', data => {
      this.clientRoom = data.roomNo;
      this.userId = data.socketId;
    });

    this.socket.on('receiveChatMessage', response => {
      const isOur = response.userId === this.userId;
      app.recieveMesageFromSocket(response, isOur);
    });

    this.socket.on('receiveGameMessage', response => {
      if (response.message.playOn === true && response.playersReady == 2) {
        this.gameOn = true;
        app.startGame();
      } else if (response.message.playOn === true) {
        const isOur = response.userId === this.userId;
        app.hideBoard(isOur);
      } else if (response.message.playOn === false) {
        this.gameOn = false;
        app.endGame();
      }

      if (response.message.movedPart) {
        const isOur = response.userId === this.userId;
        app.emitBoard(isOur);
      }

      if (response.message.innerHtml) {
        const isOur = response.userId === this.userId;
        app.updatePlayerB(response.message.innerHtml, isOur);
      }
    });
  }
}

export const socketService = new SocketService();
