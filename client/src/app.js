import './common/styles/style.css';
import moment from 'moment';
import { socketService } from './services/socket.service.js'
import { Timer } from './services/timer.service.js';
import { GameBoard } from './components/game-board/game-board.js';
import { LoginComponent } from './components/auth/auth.js';

export default class AppComponent extends HTMLElement {
  #_shadowRoot = null;

  constructor() {
    super();
    this.#_shadowRoot = this.attachShadow({ mode: 'open' });

    const templateString = `
        <style>
        @import "main.css";
        </style>
        <div><button class="btn sign-out-btn">Sign out</button> <span id="username"></span></div>
        <main class="sliding-puzzle-figure">
        
        <game-board id="playerA" isready="false"></game-board>
        
        <div class="timer">
        <button class="btn ranking">Ranking</button>
        <p><span id="hours">00</span>:<span id="minuets">00</span>:<span id="seconds">00</span>:<span id="tens">00</span></p>
        <div class="vertical-line"></div>
        </div>
        <game-board id="playerB" isready="false"></game-board>
        
        </main>
        <div class="chat-box">
        <label for="chat-box">Chat:</label>
        <div class="chat">
                <div class="message-wrapper">
                    
                </div>

                <div class="bottomNavigation">
                    <input type="text" id="input">
                    <button class="btn send-message-btn" id="send">Send message</button>
                </div>
            </div>
        </div>
        `;

    const template = document.createElement('template');
    template.innerHTML = templateString;
    this.#_shadowRoot.appendChild(template.content);
    const tensEl = this.#_shadowRoot.getElementById("tens");
    const secondsEl = this.#_shadowRoot.getElementById("seconds");
    const minuetsEl = this.#_shadowRoot.getElementById("minuets");
    const hoursEl = this.#_shadowRoot.getElementById("hours");
    this.timer = new Timer(tensEl, secondsEl, minuetsEl, hoursEl);
    this.userId = -1;
  };


  listenForGame = () => {
    const mutationCallback = (mutationsList) => {
        for (const mutation of mutationsList) {
            if ( mutation.type !== "attributes" || mutation.attributeName !== "isready" ) {
                return;
            }
            if (mutation.target.getAttribute("isready") === "true") {
                this.timer.resetTimer();
                this.timer.startTimer();
            } else if (mutation.target.getAttribute("isready") === "false") {
                this.timer.stopTimer();
            }
        }
    }
    
    const observer = new MutationObserver(mutationCallback);
    const element = this.#_shadowRoot.getElementById("playerA");

    if(!element) {
        window.setTimeout(this.listenForGame, 1000);

        return;
    }

    observer.observe(this.#_shadowRoot.getElementById("playerA"), { attributes: true });
  }

  sendMessageInChat = (input) => {
    if(input.value.trim() === '') {
        return;
      }
    
      socketService.emitMessage('message', input.value);
      input.value = '';
  }

  listenForChatMessage = () => {
    const input = this.#_shadowRoot.getElementById('input')
    this.#_shadowRoot.getElementById('send').addEventListener('click', () => this.sendMessageInChat(input));

    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            this.sendMessageInChat(input);
        }
    })
  }

  recieveMesageFromSocket(response, isOur) {
    const messageContainer = document.createElement('div');
    messageContainer.classList.add('messageContainer');
    if(!isOur) {
        messageContainer.classList.add('left');
    }

    const innerMessage = document.createElement('div');
    innerMessage.classList.add('message');
    if(!isOur) {
        innerMessage.classList.add('foreign');
    }

    const messageInfo = document.createElement('div');
    messageInfo.classList.add('messageInfo');
    
    const username = document.createElement('p');
    // TODO: Get the current user's username
    username.innerText = 'example@gmail.com';
    username.classList.add('username');
    
    const date = document.createElement('p');
    date.innerText = moment().format('MMMM Do YYYY, h:mm:ss a'); 
    date.classList.add('date');
    
    const textContainer = document.createElement('div');
    textContainer.classList.add('textContainer');
    
    const textParagraph = document.createElement('p');
    textParagraph.innerText = response.message;
    
    messageContainer.appendChild(innerMessage);
    innerMessage.appendChild(messageInfo);
    messageInfo.appendChild(username);
    messageInfo.appendChild(date);
    innerMessage.appendChild(textContainer);
    textContainer.appendChild(textParagraph);
    
    const mainMessageContainer = this.#_shadowRoot.querySelectorAll('.message-wrapper')[0];
    mainMessageContainer.prepend(messageContainer);
  }

  connectedCallback() {
    this.listenForGame();
    this.listenForChatMessage();
  }

}

customElements.define('app-root', AppComponent);

export const app = new AppComponent();
document.body.appendChild(app);
 