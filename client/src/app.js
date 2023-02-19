import { authService } from "./services/auth.service.js";
import moment from 'moment';
import { socketService } from './services/socket.service.js';
import { gameService } from './services/game.service.js';
import { Timer } from './services/timer.service.js';
import { GameBoard } from './components/game-board/game-board.js';
import { LoginComponent } from './components/auth/auth.js';
import { HttpService } from './services/http.service.js';
import { Router } from './router.js';
import { tokenService } from "./services/token.service.js";

export default class RootComponent extends HTMLElement {
    #_shadowRoot = null;

    constructor() {
        super();
        this.#_shadowRoot = this.attachShadow({ mode: 'open' });

        const templateString = `
        <style>
        @import "main.css";
        </style>`
        const template = document.createElement('template');
        template.innerHTML = templateString;

        this.#_shadowRoot.appendChild(template.content.cloneNode(true));


        const router = new Router();
        this.#_shadowRoot.appendChild(router);
        const isAuthenticated = authService.isAuthenticated;
        if (isAuthenticated) {
            router.render('/');
        } else {
            router.render('/login/');
        }
    }

    

}

customElements.define("app-root", RootComponent);

export const appRoot = new RootComponent();
document.body.appendChild(appRoot);