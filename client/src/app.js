import './common/styles/style.css';
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
                    <div class="messageContainer left">
                        <div class="message foreign">
                            <div class="messageInfo">
                                <p class="username">Jake</p>
                                <p class="date">03.12.22 18:13</p>
                            </div>
                            <div class="textContainer">
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Est blanditiis maiores voluptatum ducimus veniam asperiores distinctio porro quam numquam eos?</p>
                            </div>
                        </div>
                    </div>
                    <div class="messageContainer">
                        <div class="message">
                            <div class="messageInfo">
                                <p class="username">Jack</p>
                                <p class="date">03.12.22 18:14</p>
                            </div>
                            <div class="textContainer">
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Est blanditiis maiores voluptatum ducimus veniam asperiores distinctio porro quam numquam eos?</p>
                            </div>
                        </div>
                    </div>
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
  }
}

customElements.define('app-root', AppComponent);

const app = new AppComponent();
document.body.appendChild(app);
