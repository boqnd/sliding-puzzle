'use strict';
import './game-board-style.css';
import { Timer } from '../../services/timer.service.js';
import { svGameService } from '../../services/server-game.service';
import { scoreService } from '../../services/score.service';

const template = document.createElement('template');
template.innerHTML = `
    <style>
        @import "main.css";
    </style>
    <div class="game-board">
        <div class="heading">
            Sliding Puzzle <span class="separator hidden">|</span> <a id="shuffle" class="">Shuffle</a> <span class="separator hidden">|</span> <a id="give-up" class="">Give up</a>
        </div>
        <ul class="sliding-puzzle">
            <div class="level">
                <input type="radio" id="option1" class="option" name="options" value="all" checked>
                <label for="option1">3x3</label>

                <input type="radio" id="option2" class="option" name="options" value="false">
                <label for="option2">4x4</label>
                
                <input type="radio" id="option3" class="option" name="options" value="true">
                <label for="option3">5x5</label>
            </div>
            <button class="play">Play</button>
            <h2 class="win-label hidden">YOU WIN!</h2>
        </ul>
    </div>
`;

class GameBoard extends HTMLElement {
    #_shadowRoot = null;
    // timer;

  constructor() {
    super();
    this.#_shadowRoot = this.attachShadow({ mode: 'closed' });
    this.#_shadowRoot.appendChild(template.content.cloneNode(true));

    // Setting up variables needed for the logic
    this.board = this.#_shadowRoot.querySelectorAll('.sliding-puzzle')[0];
    this.puzzleHeight =
      this.#_shadowRoot.querySelector('.sliding-puzzle').clientHeight;
    this.shuffleEl = this.#_shadowRoot.getElementById('shuffle');
    this.giveUp = this.#_shadowRoot.getElementById('give-up');
    this.size;
    this.baseDistance;
    this.parts = [];
    this.shuffleTimeouts = [];
    this.lastShuffled;
    this.duration = 0;
  }

  // Calculating the row and column of a part by it's position
  getRow = (pos) => {
    return Math.ceil(pos / this.size);
  };
  getCol = (pos) => {
    const col = pos % this.size;
    if (col === 0) {
      return this.size;
    }
    return col;
  };

  playSetup = () => {
    const playBtn = this.#_shadowRoot.querySelectorAll('.play')[0];
    const winLabel = this.#_shadowRoot.querySelectorAll('.win-label')[0];
    const levels = this.#_shadowRoot.querySelectorAll('.level')[0];
    const separator = [...this.#_shadowRoot.querySelectorAll('.separator')];
    const level = [...this.#_shadowRoot.querySelectorAll('.option')];

    playBtn.innerHTML = 'Play Again';
    // Hiding all the unnessecery elements and showing all we need
    this.shuffleEl.classList.remove('hidden');
    this.giveUp.classList.remove('hidden');
    separator.forEach((element) => element.classList.remove('hidden'));
    playBtn.classList.add('hidden');
    winLabel.classList.add('hidden');
    levels.classList.add('hidden');
    // Deciding the level
    if (level[0].checked) {
      this.size = 3;
      this.baseDistance = 33;
    } else if (level[1].checked) {
      this.size = 4;
      this.baseDistance = 25;
    } else if (level[2].checked) {
      this.size = 5;
      this.baseDistance = 20;
    }
    // Loading the game
    this.loadGame();
    // Starting the timer
    this.setAttribute('isready', true);
  };

  // Function for setting the event listener to the play btn when it is visible(calling it right after because it is visible on the page load)
  setupPlayEventlistener = () => {
    const playBtn = this.#_shadowRoot.querySelectorAll('.play')[0];
    playBtn.addEventListener('click', this.playSetup);
  };

  // Function for removing the event listener to the play btn when it is visible(calling it right after because it is visible on the page load)
  removePlayEventlistener = () => {
    const playBtn = this.#_shadowRoot.querySelectorAll('.play')[0];
    playBtn.removeEventListener('click', this.playSetup);
  };

  // Movement map(returns an array of all parts that can be moved)
  movementMap = (position) => {
    if (this.size == 3) {
      if (position == 1) return [2, 4];
      else if (position == 2) return [1, 3, 5];
      else if (position == 3) return [2, 6];
      else if (position == 4) return [1, 5, 7];
      else if (position == 5) return [2, 4, 6, 8];
      else if (position == 6) return [3, 5, 9];
      else if (position == 7) return [4, 8];
      else if (position == 8) return [5, 7, 9];
      else if (position == 9) return [6, 8];
    }
    if (this.size == 4) {
      if (position == 1) return [2, 5];
      else if (position == 2) return [1, 3, 6];
      else if (position == 3) return [2, 4, 7];
      else if (position == 4) return [3, 8];
      else if (position == 5) return [1, 6, 9];
      else if (position == 6) return [2, 5, 7, 10];
      else if (position == 7) return [3, 6, 8, 11];
      else if (position == 8) return [4, 7, 12];
      else if (position == 9) return [5, 10, 13];
      else if (position == 10) return [6, 9, 11, 14];
      else if (position == 11) return [7, 10, 12, 15];
      else if (position == 12) return [8, 11, 16];
      else if (position == 13) return [9, 14];
      else if (position == 14) return [10, 13, 15];
      else if (position == 15) return [11, 14, 16];
      else if (position == 16) return [12, 15];
    }
    if (this.size == 5) {
      if (position == 1) return [2, 6];
      else if (position == 2) return [1, 3, 7];
      else if (position == 3) return [2, 4, 8];
      else if (position == 4) return [3, 5, 9];
      else if (position == 5) return [4, 10];
      else if (position == 6) return [1, 7, 11];
      else if (position == 7) return [2, 6, 8, 12];
      else if (position == 8) return [3, 7, 9, 13];
      else if (position == 9) return [4, 8, 10, 14];
      else if (position == 10) return [5, 9, 15];
      else if (position == 11) return [6, 12, 16];
      else if (position == 12) return [7, 11, 13, 17];
      else if (position == 13) return [8, 12, 14, 18];
      else if (position == 14) return [9, 13, 15, 19];
      else if (position == 15) return [10, 14, 20];
      else if (position == 16) return [11, 17, 21];
      else if (position == 17) return [12, 16, 18, 22];
      else if (position == 18) return [13, 17, 19, 23];
      else if (position == 19) return [14, 18, 20, 24];
      else if (position == 20) return [15, 19, 25];
      else if (position == 21) return [16, 22];
      else if (position == 22) return [17, 21, 23];
      else if (position == 23) return [18, 22, 24];
      else if (position == 24) return [19, 23, 25];
      else if (position == 25) return [20, 24];
    }
  };

  // Function for putting all the elements on the board
  renderPuzzle = () => {
    let partSize;
    // Deciding the right CSS class for the choosen level
    switch (this.size) {
      case 3:
        partSize = 'size3x3';
        break;
      case 4:
        partSize = 'size4x4';
        break;
      case 5:
        partSize = 'size5x5';
        break;
    }
    for (let i = 0; i < this.size * this.size - 1; ++i) {
      this.board.innerHTML += `
                <li class="part ${partSize}">${this.parts[i].partNumber}</li>
                `;
    }
  };

  // Function for calculating the position of a part and aplying the correct CSS
  setup = (part) => {
    let partId = part.innerHTML;
    partId--;
    let translateX = this.puzzleHeight * (this.parts[partId].left / 100);
    let translateY = this.puzzleHeight * (this.parts[partId].top / 100);
    part.style.webkitTransform =
      'translateX(' + translateX + 'px) ' + 'translateY(' + translateY + 'px)';
  };

  // Function for ending the game (win/loose)
  endGame = async (isWin) => {
    const partsElements = this.#_shadowRoot.querySelectorAll('.part');
    const winLabel = this.#_shadowRoot.querySelectorAll('.win-label')[0];
    const separator = [...this.#_shadowRoot.querySelectorAll('.separator')];
    const levels = this.#_shadowRoot.querySelectorAll('.level')[0];
    const playBtn = this.#_shadowRoot.querySelectorAll('.play')[0];
    // Deciding the label based on the given parameter and doing the proper operations with the timer
    if (isWin) {
      winLabel.innerHTML = 'You Win!';
      this.setAttribute('isready', false);
    } else {
      winLabel.innerHTML = 'You Loose :(';
      this.setAttribute('isready', false);
    }
    // Removing all parts from the board, hiding all the unnessecery elements, showing all we need and setting the event listener to the play btn again after it is visible
    partsElements.forEach((element) => element.remove());
    playBtn.classList.remove('hidden');
    levels.classList.remove('hidden');
    this.shuffleEl.classList.add('hidden');
    this.giveUp.classList.add('hidden');
    winLabel.classList.remove('hidden');
    separator.forEach((element) => element.classList.add('hidden'));
    this.parts = [];
    this.setupPlayEventlistener();
       // save game
       // players and duration are hardcoded for now
       const game = await svGameService.createGame({
        size: this.size,
        duration: this.duration,
        player1Id: 1,
        player2Id: 2,
      });

      scoreService.createScore({
        size: this.size,
        score: this.duration,
        gameId: game.id,
        winner: isWin ? game.player1Id : game.player2Id
      });
  };

  // Function, triggered on every part movement(checks for a win on evry move)
  winCheck = async (event) => {
    this.movePart(event.target);

    if (this.checkSolution()) {
      await this.endGame(true);
    }
  };

  // Function for moving a part to the empty spot(in case it can be moved)
  movePart = (part) => {
    let partNumber = part.innerHTML;
    partNumber--;
    if (!this.isPartMovable(partNumber)) {
      return;
    }

    // Swap a part with empty one based on calculations and setting the proper CSS to the patr that should be moved
    let emptyTop = this.parts[this.size * this.size - 1].top;
    let emptyLeft = this.parts[this.size * this.size - 1].left;
    let emptyPosition = this.parts[this.size * this.size - 1].position;
    this.parts[this.size * this.size - 1].top = this.parts[partNumber].top;
    this.parts[this.size * this.size - 1].left = this.parts[partNumber].left;
    this.parts[this.size * this.size - 1].position =
      this.parts[partNumber].position;

    let translateX = this.puzzleHeight * (emptyLeft / 100);
    let translateY = this.puzzleHeight * (emptyTop / 100);
    part.style.webkitTransform =
      'translateX(' + translateX + 'px) ' + 'translateY(' + translateY + 'px)';

    this.parts[partNumber].top = emptyTop;
    this.parts[partNumber].left = emptyLeft;
    this.parts[partNumber].position = emptyPosition;
  };

  // Function for checking if a part can be moved
  isPartMovable = (partNumber) => {
    let selectedPart = this.parts[partNumber];
    let emptyPart = this.parts[this.size * this.size - 1];
    let movableParts = this.movementMap(emptyPart.position);

    if (movableParts.includes(selectedPart.position)) {
      return true;
    } else {
      return false;
    }
  };

  // Function that returns true/false based on if the puzzle has been solved
  checkSolution = () => {
    if (
      this.parts[this.size * this.size - 1].position !==
      this.size * this.size
    )
      return false;
    for (let key in this.parts) {
      if (key != 0 && key != this.size * this.size - 1) {
        if (this.parts[key].position < this.parts[key - 1].position)
          return false;
      }
    }

    return true;
  };

  // Function that shuffles the current parts
  shuffle = () => {
    let shuffleDelay = 100;
    this.shuffleLoop();

    let shuffleCounter = 0;
    while (shuffleCounter <= this.size * 10) {
      shuffleDelay += 100;
      this.shuffleTimeouts.push(setTimeout(this.shuffleLoop, shuffleDelay));
      shuffleCounter++;
    }
  };

  // Function that moves a random part of the movable ones
  // Moving a part only if it wasn't moved the a step before(in the shuffle process)
  // Otherwise repeats itsef untill randomly it choses a movable part that wasn't moved a step before(in the shuffle process)
  shuffleLoop = () => {
    let partsElements = this.#_shadowRoot.querySelectorAll('.part');
    let emptyPosition = this.parts[this.size * this.size - 1].position;
    let shuffleParts = this.movementMap(emptyPosition);
    let partPosition =
      shuffleParts[Math.floor(Math.random() * shuffleParts.length)];
    let locatedPart;
    let locatedPartNumber;
    for (let i = 0; i < this.size * this.size; i++) {
      if (this.parts[i].position == partPosition) {
        locatedPartNumber = this.parts[i].partNumber;
        locatedPart = partsElements[locatedPartNumber - 1];
      }
    }
    if (this.lastShuffled != locatedPartNumber) {
      this.movePart(locatedPart);
      this.lastShuffled = locatedPartNumber;
    } else {
      this.shuffleLoop();
    }
  };

  // Function that loads the game, using all the functions above
  // Potentionally async when we add db
  loadGame = async () => {
    // Filling the parts array with propper info
    for (let index = 1; index < this.size * this.size; index++) {
      const row = this.getRow(index);
      const column = this.getCol(index);
      this.parts.push({
        partNumber: index,
        position: index,
        top: this.baseDistance * (row - 1),
        left: this.baseDistance * (column - 1),
      });
    }
    this.parts.push({
      position: this.size * this.size,
      top: this.baseDistance * (this.size - 1),
      left: this.baseDistance * (this.size - 1),
    });
    this.renderPuzzle();

    // Placed here in oreder to get the elements after rendering them
    const partsElements = this.#_shadowRoot.querySelectorAll('.part');
    for (var i = 0; i < partsElements.length; i++) {
      partsElements[i].addEventListener('click', this.winCheck);
      this.setup(partsElements[i]);
    }

    // Start shuffle
    this.shuffle();
  };

  static get observedAttributes() {
    return ['isready'];
  }

  attrbuteChangedCallback(prop, oldValue, newValue) {
    if (prop === 'isready') {
      console.log('Attribute changed');
    }
  }

  connectedCallback() {
    this.setupPlayEventlistener();
    // Adding event listeners to the shuffle and give-up btn and hiding them right after
    this.shuffleEl.addEventListener('click', this.shuffle);
    this.giveUp.addEventListener('click', () => {
      this.endGame(false);
    });
    this.shuffleEl.classList.add('hidden');
    this.giveUp.classList.add('hidden');
  }

  disconnectedCallBack() {
    this.removePlayEventlistener();
    this.shuffleEl.removeEventListener('click', this.shuffle);
    this.giveUp.removeEventListener('click', () => {
      this.endGame(false);
    });
  }
}

customElements.define('game-board', GameBoard);
export default GameBoard;
