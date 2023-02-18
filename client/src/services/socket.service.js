import io from 'socket.io-client';

import { gameScreenComponent } from '../components/game-screen/game-screen.js'

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
      gameScreenComponent.recieveMesageFromSocket(response, isOur);
    });

    this.socket.on('receiveGameMessage', response => {
      if (response.message.playOn === true && response.playersReady == 2) {
        this.gameOn = true;
        gameScreenComponent.startGame();
      } else if (response.message.playOn === true) {
        const isOur = response.userId === this.userId;
        gameScreenComponent.hideBoard(isOur);
      } else if (response.message.playOn === false) {
        this.gameOn = false;
        gameScreenComponent.endGame();
      }

      if (response.message.movedPart) {
        const isOur = response.userId === this.userId;
        gameScreenComponent.emitBoard(isOur);
      }

      if (response.message.innerHtml) {
        const isOur = response.userId === this.userId;
        gameScreenComponent.updatePlayerB(response.message.innerHtml, isOur);
      }
    });
  }

  listenForWin = (triggerFunc) => {
    this.socket.on('receiveGameMessage', response => {
      if (response.message.isWin !== undefined) {
        const isOur = response.userId === this.userId;
        if (!isOur) {
          triggerFunc(response.message.isWin, isOur);
          socketService.emitMessage('gameMessage', {playOn: false});
        }
      }
    });
  }
}

export const socketService = new SocketService();
