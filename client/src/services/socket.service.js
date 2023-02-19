import io from 'socket.io-client';

import { gameScreenComponent } from '../components/game-screen/game-screen.js'
import { tokenService } from './token.service.js';

class SocketService {
  constructor() {
    this.socket = io('http://localhost:3000');
    this.userId;
    this.clientRoom;
    this.gameOn = false;
    this.handleSockets();
    this.components = [];
  }

  emitMessage = (event, data) => {
    this.socket.emit(event, data);
  }

  appendComponent = (component) => {
    this.components.push(component);
  }

  removeComponent = (component) => {
    this.components = this.components.filter(comp => comp !== component);
  }

  handleSockets = () => {
    this.socket.on('serverMsg', data => {
      this.clientRoom = data.roomNo;
      this.userId = data.socketId;
      const user = tokenService.getDecodedToken();
      console.log(user);
      this.emitMessage('currentUser', {userId: user.user_id, roomNo: this.clientRoom});
    });

    this.socket.on('receiveChatMessage', response => {
      const isOur = response.userId === this.userId;
      this.components.map(comp => comp.recieveMesageFromSocket(response, isOur));
    });

    this.socket.on('receiveGameMessage', response => {
      if (response.message.playOn === true && response.playersReady == 2) {
        this.gameOn = true;
        this.components.map(comp => comp.startGame());
      } else if (response.message.playOn === true) {
        const isOur = response.userId === this.userId;
        this.components.map(comp => comp.hideBoard(isOur));
      } else if (response.message.playOn === false) {
        this.gameOn = false;
        this.components.map(comp => comp.endGame());
      }

      if (response.message.movedPart) {
        const isOur = response.userId === this.userId;
        this.components.map(comp => comp.emitBoard(isOur));
      }

      if (response.message.innerHtml) {
        const isOur = response.userId === this.userId;
        this.components.map(comp => comp.updatePlayerB(response.message.innerHtml, isOur));
      }
    });
  }

  listenForWin = (triggerFunc) => {
    this.socket.on('receiveGameMessage', response => {
      if (response.message.isWin !== undefined) {
        const isOur = response.userId === this.userId;
        if (!isOur) {
          triggerFunc(response.message.isWin, isOur, response.players);
          socketService.emitMessage('gameMessage', {playOn: false});
        }
      }
    });
  }

  endGame() {
    this.emitMessage('endGame', {roomNo: this.clientRoom});
  }
}

export const socketService = new SocketService();
